import { Request, Response } from 'express'
import * as bcrypt from 'bcryptjs'
import userValidator from '../validators/userValidator'
import userDao from '../dao/userDao'
import { user } from '@prisma/client'

// import UserDao from '../dao/UserDao'

class UserController {
  public async index(req: Request, res: Response): Promise<Response> {
    return res.json({})
  }

  public async store(req: Request, res: Response): Promise<Response> {
    try {

      const data = req.body
      const validation = userValidator.validateStore(data)
      if (!validation.success) {
        return res.status(400).json({ error: true, errors: validation.errors })
      }

      let { first_name, last_name, email, password, avatar_url, role_id } = req.body
      const userExists = await userDao.findUserByEmail(email)

      if (userExists) {
        return res.status(409).json({
          error: true,
          message: 'User already exists.'
        })
      }

      password = bcrypt.hashSync(password, 8)
      const result = await userDao.store({ first_name, last_name, email, password, avatar_url, role_id } as user)
      delete result.password
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
