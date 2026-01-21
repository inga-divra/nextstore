import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import sampleData from './sample-data';
import { PrismaPg } from '@prisma/adapter-pg';

async function main() {
    const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
    const prisma = new PrismaClient({ adapter });

    await prisma.product.deleteMany();
    await prisma.product.createMany({ data: sampleData.products });

    console.log('Database seeded successfully');
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
