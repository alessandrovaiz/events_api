import e, { Request, Response } from 'express'
import { user_tickets } from '@prisma/client'
import userTicketsDao from '../dao/userTicketsDao'
import userTicketsValidator from '../validators/userTicketsValidator'

class userTicketsController {
    
    public async fetchUserTicketsByUserId(req: Request, res: Response): Promise<Response> {
        try {
            const userId = req.params.userId
            const result = await userTicketsDao.fetchUserTicketsByUserId(userId)
            return res.status(200).json({ error: false, result })
        } catch (err: unknown) {
            console.log((err as Error).message)
            return res.status(500).json({
                error: true,
                message: (err as Error).message
            })
        }
    }

    public async index(req: Request, res: Response): Promise<Response> {
        try {
            const userTicketId = req.params.userTicketId
            if(!userTicketId) {
                return res.status(500).json({
                    error: true,
                    message: 'Param userTicketId is required'
                })
            }
            const result = await userTicketsDao.index(userTicketId)

            return res.status(200).json({ error: false, result })
        } catch (err: unknown) {
            console.log((err as Error).message)
            return res.status(500).json({
                error: true,
                message: (err as Error).message
            })
        }
    }

    public async store(req: Request, res: Response): Promise<Response> {
        try {
            const validation = userTicketsValidator.validateStore(req.body)
            if (!validation.success) {
                return res.status(400).json({ error: true, errors: validation.errors })
            }
            
            let user_id = req.userId
            let { ticket_id, batch_id, amount, purchase_date, payment_method } = req.body 
            let userTickets = { user_id, ticket_id, batch_id, amount, purchase_date, payment_method } as user_tickets

            const result = await userTicketsDao.store(userTickets)

            return res.status(200).json({ error: false, result })
        } catch (err: unknown) {
            console.log((err as Error).message)
            return res.status(500).json({
                error: true,
                message: (err as Error).message
            })
        }
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        try {
            const userTicketsId = req.params.userTicketId
            const result = await userTicketsDao.delete(userTicketsId)

            return res.status(200).json({ error: false, result })
        } catch (err: unknown) {
            console.log((err as Error).message)
            return res.status(500).json({
                error: true,
                message: (err as Error).message
            })
        }
    }
}

export default new userTicketsController()
