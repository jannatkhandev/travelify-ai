import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

const globalPrisma = globalThis || global;

if (!globalPrisma.prismaGlobal) {
  globalPrisma.prismaGlobal = prismaClientSingleton();
}

const prisma = globalPrisma.prismaGlobal;

export const db = prisma;

if (process.env.NODE_ENV !== 'production') {
  globalPrisma.prismaGlobal = prisma;
}
