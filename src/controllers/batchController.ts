import { Request, Response } from 'express'
import * as bcrypt from 'bcryptjs'
import { batch } from '@prisma/client'
import batchDao from '../dao/batchDao'
import batchValidator from '../validators/batchValidator'

// import UserDao from '../dao/UserDao'

class BatchController {

    public async fetch(req: Request, res: Response): Promise<Response> {
        try {
            const result = await batchDao.fetch()
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
            const batchId = req.params.batchId
            const result = await batchDao.index(batchId)

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
            const validation = batchValidator.validateStore(req.body)
            if (!validation.success) {
                return res.status(400).json({ error: true, errors: validation.errors })
            }

            let { ticket_price, ticket_id, amount, is_active, batch_effective_date } = req.body
            let batch = { ticket_price, ticket_id, amount, is_active, batch_effective_date } as batch

            batch_effective_date = new Date(batch_effective_date)

            const result = await batchDao.store(batch)

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
            const batchId = req.params.batchId

            const validation = batchValidator.validateUpdate(req.body)
            if (!validation.success) {
                return res.status(400).json({ error: true, errors: validation.errors })
            }

            let { ticket_price, ticket_id, amount, is_active, batch_effective_date } = req.body
            let batch = { ticket_price, ticket_id, amount, is_active, batch_effective_date } as batch

            const result = await batchDao.update(batch, batchId)

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
            const batchId = req.params.batchId
            const result = await batchDao.delete(batchId)

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

export default new BatchController()
