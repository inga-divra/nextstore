import { prisma } from '@/db/prisma';
import { Prisma } from '@prisma/client';


type SalesDataType = {
    month: string,
    totalSales: number
}[];
// Get sales data and order summary
export async function getOrderSummary() {
    // Get counts for each resource
    const ordersCount = await prisma.order.count();
    const productsCount = await prisma.product.count();
    const usersCount = await prisma.user.count();

    // Calculate total sales
    const totalSales = await prisma.order.aggregate({
        _sum: { totalPrice: true },
    });

    // Get monthly sales
    const salesDataRaw = await prisma.$queryRaw<
        Array<{ month: string; totalSales: Prisma.Decimal }>
    >`SELECT to_char("createdAt", 'MM/YY') as "month", sum("totalPrice") as "totalSales" FROM "Order" GROUP BY to_char("createdAt", 'MM/YY')`;

    const salesData: SalesDataType = salesDataRaw.map((entry) => ({
        month: entry.month,
        totalSales: Number(entry.totalSales), // Convert Decimal to number
    }));

    // Get latest sales
    const latestOrders = await prisma.order.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            user: { select: { name: true } },
        },
        take: 6,
    });

    return {
        ordersCount,
        productsCount,
        usersCount,
        totalSales,
        latestOrders,
        salesData,
    };
}