import { Request, Response } from 'express'
import * as bcrypt from 'bcryptjs'
import { event } from '@prisma/client'
import eventDao from '../dao/eventDao'
import eventValidator from '../validators/eventValidator'

// import UserDao from '../dao/UserDao'

class EventController {

    public async fetch(req: Request, res: Response): Promise<Response> {
        try {
            const result = await eventDao.fetch()
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
            const eventId = req.params.eventId
            const result = await eventDao.index(eventId)

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
            const validation = eventValidator.validateStore(req.body)
            if (!validation.success) {
                return res.status(400).json({ error: true, errors: validation.errors })
            }

            let { name, description, event_date, is_active, company_id, thumbnail_url } = req.body
            let event = { name, description, event_date, is_active, company_id, thumbnail_url } as event

            const result = await eventDao.store(event)

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
            const eventId = req.params.eventId

            const validation = eventValidator.validateUpdate(req.body)
            if (!validation.success) {
                return res.status(400).json({ error: true, errors: validation.errors })
            }

            let { name, description, event_date, is_active, company_id, thumbnail_url } = req.body
            let event = { name, description, event_date, is_active, company_id, thumbnail_url } as event

            const result = await eventDao.update(event, eventId)

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
            const eventId = req.params.userId
            const result = await eventDao.delete(eventId)

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

export default new EventController()
