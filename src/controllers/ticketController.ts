import { Request, Response } from 'express'
import { ticket, batch } from '@prisma/client'
import ticketDao from '../dao/ticketDao'
import ticketValidator from '../validators/ticketValidator'

// import UserDao from '../dao/UserDao'

class ticketController {
    public async fetch(req: Request, res: Response): Promise<Response> {
        try {
            const result = await ticketDao.fetch()
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
            const ticketId = req.params.ticketId
            const result = await ticketDao.index(ticketId)

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
            const validation = ticketValidator.validateStore(req.body)
            if (!validation.success) {
                return res.status(400).json({ error: true, errors: validation.errors })
            }
            let { expiration_date, event_id, ticket_price, amount, batch_effective_date, is_active } = req.body

            let ticket = { expiration_date, event_id } as ticket
            let batch = { ticket_price, amount, batch_effective_date, is_active } as batch

            const result = await ticketDao.store(ticket, batch)

            return res.status(200).json({ error: false, result })
        } catch (err: unknown) {
            console.log((err as Error).message)
            return res.status(500).json({
                error: true,
                message: (err as Error).message
            })
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        try {
            const ticketId = req.params.ticketId

            const validation = ticketValidator.validateUpdate(req.body)
            if (!validation.success) {
                return res.status(400).json({ error: true, errors: validation.errors })
            }

            let { expiration_date } = req.body
            let ticket = { expiration_date } as ticket

            const result = await ticketDao.update(ticket, ticketId)

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
            const ticketId = req.params.ticketId
            const result = await ticketDao.delete(ticketId)

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

export default new ticketController()
