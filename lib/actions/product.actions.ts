'use server';
import { prisma } from '@/db/prisma';
import { convertToPlainObject } from '@/lib/utils';
import { LATEST_PRODUCTS_LIMIT } from '@/lib/constants';

// Get latest products
export const getLatestProducts = async () => {
    const data = await prisma.product.findMany({
        take: LATEST_PRODUCTS_LIMIT,
        orderBy: { createdAt: 'desc' },
    });

    return convertToPlainObject(data);
};

//Get single prodcut by it`s slug
export const getProductBySlug = async (slug: string) => {
    return await prisma.product.findFirst({
        where: { slug: slug }
    })
}
