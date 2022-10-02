import { NextFunction, Request, Response } from "express"
import Helper from "../utils/Helper"
import jwt, { TokenExpiredError } from "jsonwebtoken"
import User from "../models/User"

const auth = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const token = request.headers.authorization?.replace('Bearer ', '')

    if (!token) {
      return Helper.errorResponse(response, 401, 'Bearer token not found.')
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (typeof decoded === 'string') {
      return Helper.errorResponse(response, 401, 'Authentication Failed.')
    }

    const user = await User.findOne({ _id: decoded.user_id })

    if (user) {
      request.user = user
      return next()
    }

    return Helper.errorResponse(response, 401, 'Authentication Failed.')
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return Helper.errorResponse(response, 401, 'Bearer token is expired.')
    }

    return Helper.errorResponse(response, 401, 'Authentication Failed.')
  }
}

export default auth
