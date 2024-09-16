import { PrismaClient } from '@prisma/client';


const prismaClientSingle = () => {
    return new PrismaClient();
}

type PrismaClientSingle = ReturnType<typeof prismaClientSingle>;

const globalPrisma = globalThis as unknown as {
    prisma: PrismaClientSingle | undefined;
};

const db = globalPrisma.prisma ?? prismaClientSingle();

export default db;

if (process.env.NODE_ENV !== 'production') globalPrisma.prisma = db;