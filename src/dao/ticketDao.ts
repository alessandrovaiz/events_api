import { PrismaClient, ticket, batch } from '@prisma/client';
const prisma = new PrismaClient();

let ticketDao = {

    async fetch(): Promise<ticket[] | undefined> {
        const result = await prisma.ticket.findMany({
            where: {
                expiration_date: {
                    gte: new Date()
                },
            },
            orderBy: { created_at: 'desc' },
            include: {
                _count: true,
                batch: {
                    select: {
                        id: true,
                        ticket_price: true,
                        amount: true,
                        is_active: true,
                        batch_effective_date: true
                    },
                    /** A lógica utilizada foi de buscar o valor do ingresso em ordem de criação asc
                     *  Por exemplo: 
                     *  lancei o lote 1 no valor de 100 reais o ingresso. 
                     *  O valor desse ingresso será 100 reais até que esse lote acabe ou seja inativado  */
                    orderBy: {
                        created_at: 'asc',
                    },
                    where: {
                        is_active: true
                    },
                    take: 1
                },
                event: {
                    select: {
                        company: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                }
            }
        })
        return result
    },

    async index(ticketId: string): Promise<ticket | undefined> {
        const result = await prisma.ticket.findFirst({
            where: { id: ticketId },
            include: {
                _count: true,
                batch: {
                    select: {
                        id: true,
                        ticket_price: true,
                        amount: true,
                        is_active: true,
                        batch_effective_date: true
                    },
                   /** A lógica utilizada foi de buscar o valor do ingresso em ordem de criação asc
                     *  Por exemplo: 
                     *  lancei o lote 1 no valor de 100 reais o ingresso. 
                     *  O valor desse ingresso será 100 reais até que esse lote acabe ou seja inativado  */
                    orderBy: {
                        created_at: 'asc',
                    },
                    where: {
                        is_active: true
                    },
                    take: 1
                }
            }
        })
        return result
    },

    async store(ticket: ticket, batch: batch): Promise<ticket | undefined> {
        const result = await prisma.ticket.create({
            data: {
                expiration_date: ticket.expiration_date,
                event_id: ticket.event_id,
                batch: {
                    create: batch
                }
            }

        })

        return result
    },

    async update(data: ticket, ticketId: string): Promise<ticket | undefined> {
        data.updated_at = new Date()
        const result = await prisma.ticket.update({
            data,
            where: {
                id: ticketId,
            }
        })

        return result
    },

    async delete(ticketId: string): Promise<Boolean> {
        /** Quando um ticket for deletado, seus lotes também devem ser deletados. */
        const user_tickets = prisma.user_tickets.deleteMany({
            where: {
                ticket_id: ticketId
            }
        })
        const batches = prisma.batch.deleteMany({
            where: {
                ticket_id: ticketId
            }
        })
        const ticket = prisma.ticket.delete({
            where: { id: ticketId },
        })

        await prisma.$transaction([user_tickets, batches, ticket])

        return true
    }
}

export default ticketDao