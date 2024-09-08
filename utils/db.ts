import { PrismaClient } from '@prisma/client';

const prismaClientSingle = () => {
    return new PrismaClient();
}

type PrismaClientSingle = ReturnType<typeof prismaClientSingle>;

const globalPrisma = globalThis as unknown as {
    prisma: PrismaClientSingle | undefined;
};

const prisma = globalPrisma.prisma ?? prismaClientSingle();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalPrisma.prisma = prisma;