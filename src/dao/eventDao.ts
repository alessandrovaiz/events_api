import { PrismaClient, event } from '@prisma/client';
const prisma = new PrismaClient();

let eventDao = {

    async fetch() : Promise<event[] | undefined>{
        const result = await prisma.event.findMany({
            where: { is_active: true },
            orderBy: { created_at: 'desc' },
            include: {
                _count: true,
                address_event: true,
                company: true,
                ticket: {
                    include: {
                        _count: true
                    }
                },
            }
        })
        return result
    },

    async index(eventId: string) : Promise<event | undefined> {
        const result = await prisma.event.findFirst({
            where: { id: eventId },
            include: {
                _count: true,
                address_event: true,
                company: true,
                ticket: {
                    include: {
                        _count: true
                    }
                },
            }
        })
        return result
    },

    async store(data: event): Promise<event | undefined> {
        const result = await prisma.event.create({
            data
        })

        return result
    },

    async update(data: event, eventId: string): Promise<event | undefined> {
        data.updated_at = new Date()
        const result = await prisma.event.update({
            data,
            where: {
                id: eventId,
            }
        })

        return result
    },

    async delete(eventId: string): Promise<event | undefined> {
        const result = await prisma.event.update({
            where: { id: eventId },
            data: {
                is_active: false,
                updated_at: new Date()
            }
        })

        return result
    }
}

export default eventDao