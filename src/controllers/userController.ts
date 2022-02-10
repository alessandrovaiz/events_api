import { Request, Response } from 'express'
import * as bcrypt from 'bcryptjs'
import userValidator from '../validators/userValidator'
import userDao from '../dao/userDao'
import { user } from '@prisma/client'

// import UserDao from '../dao/UserDao'

class UserController {
  public async fetch(req: Request, res: Response): Promise<Response> {
    try {
      const result = await userDao.fetch()
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
      const userId = req.params.userId
      const result = await userDao.index(userId)

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
      const validation = userValidator.validateStore(req.body)
      if (!validation.success) {
        return res.status(400).json({ error: true, errors: validation.errors })
      }

      let { first_name, last_name, email, password, avatar_url, role_id, is_active } = req.body
      const userExists = await userDao.findUserByEmail(email)

      if (userExists) {
        return res.status(409).json({
          error: true,
          message: 'User already exists.'
        })
      }

      password = bcrypt.hashSync(password, 8)
      let user = { first_name, last_name, email, password, avatar_url, role_id, is_active } as user

      const result = await userDao.store(user)

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
      const userId = req.params.userId

      const validation = userValidator.validateUpdate(req.body)
      if (!validation.success) {
        return res.status(400).json({ error: true, errors: validation.errors })
      }

      let { first_name, last_name, email, password, avatar_url, role_id, is_active } = req.body

      if (password) {
        password = bcrypt.hashSync(password, 8)
      }

      let user = { first_name, last_name, email, password, avatar_url, role_id, is_active } as user

      const result = await userDao.update(user, userId)

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
      const userId = req.params.userId
      const result = await userDao.delete(userId)

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

export default new UserController()
