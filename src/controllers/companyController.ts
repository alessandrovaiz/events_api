import { Request, Response } from 'express'
import { company } from '@prisma/client'
import companyDao from '../dao/companyDao'
import companyValidator from '../validators/companyValidator'

// import UserDao from '../dao/UserDao'

class companyController {
    public async fetch(req: Request, res: Response): Promise<Response> {
        try {
            const result = await companyDao.fetch()
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
            const companyId = req.params.companyId
            const result = await companyDao.index(companyId)

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
            const validation = companyValidator.validateStore(req.body)
            if (!validation.success) {
                return res.status(400).json({ error: true, errors: validation.errors })
            }

            let { name, trading_name, phone, email, cnpj, is_active, company_type_id, thumbnail_url } = req.body
            let company = { name, trading_name, phone, email, cnpj, is_active, company_type_id, thumbnail_url } as company

            const result = await companyDao.store(company)

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
            const companyId = req.params.companyId

            const validation = companyValidator.validateUpdate(req.body)
            if (!validation.success) {
                return res.status(400).json({ error: true, errors: validation.errors })
            }

            let { name, trading_name, phone, email, cnpj, is_active, company_type_id, thumbnail_url } = req.body
            let company = { name, trading_name, phone, email, cnpj, is_active, company_type_id, thumbnail_url } as company

            const result = await companyDao.update(company, companyId)

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
            const companyId = req.params.companyId
            const result = await companyDao.delete(companyId)

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

export default new companyController()
