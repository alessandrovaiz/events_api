import { Request, Response } from 'express'
import { address } from '@prisma/client'
import addressDao from '../dao/addressDao'
import addressValidator from '../validators/addressValidator'

// import UserDao from '../dao/UserDao'

class addressController {
    public async fetch(req: Request, res: Response): Promise<Response> {
        try {
            const result = await addressDao.fetch()
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
            const addressId = req.params.addressId
            const result = await addressDao.index(addressId)

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
            const validation = addressValidator.validateStore(req.body)
            if (!validation.success) {
                return res.status(400).json({ error: true, errors: validation.errors })
            }

            let { street, number, complement, zipcode, district, city, state } = req.body
            let address = { street, number, complement, zipcode, district, city, state } as address

            const result = await addressDao.store(address)

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
            const addressId = req.params.addressId

            const validation = addressValidator.validateUpdate(req.body)
            if (!validation.success) {
                return res.status(400).json({ error: true, errors: validation.errors })
            }

            let { street, number, complement, zipcode, district, city, state } = req.body
            let address = { street, number, complement, zipcode, district, city, state } as address

            const result = await addressDao.update(address, addressId)

            return res.status(200).json({ error: false, result })
        } catch (err: unknown) {
            console.log((err as Error).message)
            return res.status(500).json({
                error: true,
                message: (err as Error).message
            })
        }
    }

    /**
     * Método que vincula ou desvincula o endereço de uma entidade
     * 
     * @bodyParam {entity_id} - id da entidade
     * @bodyParam {address_id} - id do endereço
     * @bodyParam {unlink} - flag indicando se é para remover ou vincular   
     * 
     */
    public async linkAddressWithEntity(req: Request, res: Response): Promise<Response> {
        try {
            const validation = addressValidator.validateLinkOrUnlinkAddressWithEntity(req.body)
            if (!validation.success) {
                return res.status(400).json({ error: true, errors: validation.errors })
            }

            let { address_id, entity, entity_id, unlink } = req.body
            let result: any

            if (!unlink) {
                switch (entity) {
                    case 'user': result = await addressDao.linkAddressWithUser(address_id, entity_id); break;
                    case 'company': result = await addressDao.linkAddressWithCompany(address_id, entity_id); break;
                    case 'event': result = await addressDao.linkAddressWithEvent(address_id, entity_id); break;
                    default: {
                        return res.status(500).json({
                            error: true,
                            message: 'Invalid entity'
                        })
                    }
                }
            } else {
                switch (entity) {
                    case 'user': result = await addressDao.unlinkAddressFromUser(address_id, entity_id); break;
                    case 'company': result = await addressDao.unlinkAddressFromCompany(address_id, entity_id); break;
                    case 'event': result = await addressDao.unlinkAddressFromEvent(address_id, entity_id); break;
                    default: {
                        return res.status(500).json({
                            error: true,
                            message: 'Invalid entity'
                        })
                    }
                }
            }

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
            const addressId = req.params.addressId
            const result = await addressDao.delete(addressId)

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

export default new addressController()
