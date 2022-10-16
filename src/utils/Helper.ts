import { Edge } from 'edge.js'
import { Response } from 'express'
import { join } from 'path'

class Helper {
  static successResponse(response: Response, message: string, result: any = null) {
    return response.status(200).json({
      status: 200,
      message: message,
      result: result
    })
  }

  static errorResponse(response: Response, code: number, message: string = 'Something went wrong, please try again.') {
    return response.status(code).json({
      status: code,
      message: message,
      result: null
    })
  }

  static view(file: string) {
    const edge = new Edge({ cache: false })
    edge.mount(join(__dirname, '../resources/views'))

    return edge.render(file)
  }
}

export default Helper
