import { Request, Response } from 'express'
import userDao from '../dao/userDao'
import * as bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import authValidator from '../validators/authValidator'

// import UserDao from '../dao/UserDao'

class AuthController {
  public async auth(req: Request, res: Response): Promise<Response> {
    try {

      const data = req.body
      const validation = authValidator.validateAuth(data);

      if (!validation.success) {
        return res.status(400).json({
          success: false,
          errors: validation.errors
        })
      }

      const { email, password } = req.body
      const user = await userDao.findUserByEmail(email)
      if (user) {
        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) {
          throw new Error('Invalid password')
        }
      } else {
        throw new Error('Invalid email')
      }

      delete user.password
      const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' })

      return res.status(200).json({
        error: false,
        user,
        token
      })
    } catch (err: unknown) {
      console.log((err as Error).message)
      return res.status(401).json({
        error: true,
        message: (err as Error).message
      })
    }
  }
}

export default new AuthController()
