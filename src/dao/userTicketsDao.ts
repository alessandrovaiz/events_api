import { PrismaClient, user_tickets } from '@prisma/client';
const prisma = new PrismaClient();

let userTicketsDao = {

    async fetchUserTicketsByUserId(userId: string): Promise<user_tickets[] | undefined> {
        const result = await prisma.user_tickets.findMany({
            where: { user_id: userId },
            orderBy: { created_at: 'desc' },
            include: {
                ticket: {
                    select: {
                        expiration_date: true,
                        created_at: true,
                        id: true,
                        event: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                },

            }
        })
        return result
    },

    async index(userTicketId: string): Promise<user_tickets | undefined> {
        const result = await prisma.user_tickets.findFirst({
            where: { id: userTicketId },
            include: {
                ticket: {
                    select: {
                        expiration_date: true,
                        created_at: true,
                        id: true,
                        event: {
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

    async store(data: user_tickets): Promise<any | undefined> {
        /**
         * Busca o lote atual do ticket
         */
        const batch = await prisma.batch.findFirst({
            where: {
                id: data.batch_id,
                is_active: true
            },
        })
        console.log(batch)
        /**Caso não haja lote, retorna um erro*/
        if (!batch) { throw new Error('There is no batch for this ticket') }
        /**Caso não haja quantidade disponível no lote para esta compra, retorna um erro */
        if (batch.amount < data.amount) { throw new Error('There is no enough stock for this purchase') }
        /**Caso a nova quantidade seja = 0, automáticamente desativa o lote*/
        let keepBatchActive: boolean = true
        if (batch.amount - data.amount == 0) keepBatchActive = false

        const createUserTicket = prisma.user_tickets.create({
            data
        })
        const updateBatch = prisma.batch.update({
            where: { id: batch.id },
            data: {
                amount: batch.amount - data.amount,
                is_active: keepBatchActive
            }
        })

        await prisma.$transaction([createUserTicket, updateBatch])
        return true
    },


    async delete(userTicketId: string): Promise<any | undefined> {

        const userTicket = await prisma.user_tickets.findFirst({
            where: {
                id: userTicketId
            },
            include: {
                batch: true
            }
        })

        if (!userTicket) { throw new Error('No userTicket Found with this uuid, stopping delete process') }

        let currentBatchAmount: number
        let amountToRollback: number

        currentBatchAmount = userTicket.batch.amount

        if (currentBatchAmount)
            amountToRollback = userTicket.amount + currentBatchAmount

        let checkIfTheBatchIsActive = await prisma.batch.findFirst({
            where: {
                id: userTicket.batch_id,
                is_active: true
            }
        })

        let updateAmount = prisma.batch.update({
            data: {
                amount: amountToRollback
            },
            where: { id: userTicket.batch_id }
        })

        let deleteTicket = prisma.user_tickets.deleteMany({
            where: { id: userTicketId }
        })


        await prisma.$transaction([updateAmount, deleteTicket])

        return true
    }
}

export default userTicketsDao