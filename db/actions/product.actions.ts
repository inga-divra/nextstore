'use server';
import { prisma } from '@/lib/prisma';
import { convertToPlainObject } from '@/lib/utils';

export async function getLatestProducts() {
    const data = await prisma.product.findMany({
        take: 4,
        orderBy: { createdAt: 'desc' },
    });

    return convertToPlainObject(data);
}
