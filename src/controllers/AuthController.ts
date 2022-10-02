import { Request, Response } from 'express'
import User, { IUser } from '../models/User'
import bcrypt from 'bcrypt'
import Helper from '../utils/Helper'
import jwt from 'jsonwebtoken'
import Mail from '../utils/Mail'

class AuthController {
  static async register(request: Request, response: Response) {
    try {
      const userExists = await User.exists({ email: request.body.email })

      if (userExists) {
        return Helper.errorResponse(response, 422, 'Email already exists.')
      }

      await User.create({
        name: request.body.name,
        email: request.body.email,
        password: bcrypt.hashSync(request.body.password, bcrypt.genSaltSync())
      })

      await new Mail()
        .to(request.body.email)
        .subject('Welcome')
        .body('<h1>Welcome</h1>')
        .send()

      return Helper.successResponse(response, 'Registered successfully, please login to continue.')
    } catch (error: any) {
      return Helper.errorResponse(response, 500)
    }
  }

  static async login(request: Request, response: Response) {
    try {
      const user = await User.findOne({ email: request.body.email }).select('+password')

      if (user === null) {
        return Helper.errorResponse(response, 400, 'User not found.')
      }

      if (!bcrypt.compareSync(request.body.password, user.password || '')) {
        return Helper.errorResponse(response, 400, 'Wrong password, please try again.')
      }

      return AuthController.tokenResponse(response, 'Successfully logged in.', user)
    } catch (error: any) {
      return Helper.errorResponse(response, 500)
    }
  }

  static tokenResponse(response: Response, message: string, user: IUser) {
    delete user.password

    const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE_TIME })
    return Helper.successResponse(response, message, { token: token, expiresIn: process.env.JWT_EXPIRE_TIME, user: user })
  }

  static async profile(request: Request, response: Response) {
    const user = (await User.findById(request.user?._id))?.toJSON()

    return Helper.successResponse(response, 'success', user)
  }
}

export default AuthController
