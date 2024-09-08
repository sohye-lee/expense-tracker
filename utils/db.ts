import { PrismaClient } from '@prisma/client';

const prismaClientSingle = () => {
    return new PrismaClient();
}

type PrismaClientSingle = ReturnType<typeof prismaClientSingle>;

const globalPrisma = globalThis as unknown as {
    db: PrismaClientSingle | undefined;
};

const db = globalPrisma.db ?? prismaClientSingle();

export default db;

if (process.env.NODE_ENV !== 'production') globalPrisma.db = db;