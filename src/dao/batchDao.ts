import { PrismaClient, batch } from '@prisma/client';
const prisma = new PrismaClient();

let batchDao = {

    async fetch() {
        const result = await prisma.batch.findMany({
            where: { is_active: true },
            orderBy: { created_at: 'desc' },
            include: {
                ticket: true                
            }
        })
        return result
    },

    async index(batchId: string) : Promise<batch | undefined> {
        const result = await prisma.batch.findFirst({
            where: { id: batchId },
            include: {
                ticket: {
                    include: {
                        _count: true,
                        event: {
                            select: {
                                name: true,
                                is_active: true
                            }
                        }
                    }
                }
            }
        })
        return result
    },

    async store(data: batch): Promise<batch | undefined> {
        const result = await prisma.batch.create({
            data
        })

        return result
    },

    async update(data: batch, batchId: string): Promise<batch | undefined> {
        data.updated_at = new Date()
        const result = await prisma.batch.update({
            data,
            where: {
                id: batchId
            }
        })

        return result
    },

    async delete(batchId: string): Promise<batch | undefined> {
        const result = await prisma.batch.update({
            where: { id: batchId },
            data: {
                is_active: false,
                updated_at: new Date()
            }
        })

        return result
    }
}

export default batchDao