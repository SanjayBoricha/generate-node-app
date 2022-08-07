import { Response } from 'express'

class Helper {
  static successResponse(response: Response, message: string, result: any = null) {
    return response.status(200).json({
      status: 200,
      message: message,
      result: result
    });
  }

  static errorResponse(response: Response, code: number, message: string = 'Something went wrong, please try again.') {
    return response.status(code).json({
      status: code,
      message: message,
      result: null
    });
  }
}

export default Helper
