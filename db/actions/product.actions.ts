'use server';

import { prisma } from '@/lib/prisma';

export const getLatestProducts = async () => {
    return prisma.product.findMany({
        take: 4,
        orderBy: { createdAt: 'desc' },
    });
};
