import { Request, Response } from 'express'
import User, { IUser } from '../models/User'
import bcrypt from 'bcrypt'
import Helper from '../utils/Helper'
import jwt from 'jsonwebtoken'

class AuthController {
  static async register(req: Request, response: Response) {
    try {
      const userExists = await User.exists({ email: req.body.email });

      if (userExists) {
        return Helper.errorResponse(response, 422, 'Email already exists.')
      }

      await User.create({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync())
      })

      return Helper.successResponse(response, 'Registered successfully, please login to continue.')
    } catch (error: any) {
      return Helper.errorResponse(response, 500)
    }
  }

  static async login(req: Request, response: Response) {
    try {
      const user = await User.findOne({ email: req.body.email }).select('+password');

      if (user === null) {
        return Helper.errorResponse(response, 400, 'User not found.')
      }

      if (!bcrypt.compareSync(req.body.password, user.password || '')) {
        return Helper.errorResponse(response, 400, 'Wrong password, please try again.')
      }

      return AuthController.tokenResponse(response, 'Successfully logged in.', user)
    } catch (error: any) {
      return Helper.errorResponse(response, 500)
    }
  }

  static tokenResponse(response: Response, message: string, user: IUser) {
    const jwtSecret: string = process.env.JWT_SECRET || ''
    const expiresIn: string = process.env.JWT_EXPIRE_TIME || '3600'

    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id
      },
      jwtSecret,
      {
        expiresIn: expiresIn
      }
    );

    user.password = undefined

    return Helper.successResponse(response, message, { token: token, expiresIn: expiresIn, user })
  }
}

export default AuthController
