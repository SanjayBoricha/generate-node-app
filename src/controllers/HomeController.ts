import { Request, Response } from 'express'
import { view } from '../utils/View'

class HomeController {
  static async index(request: Request, response: Response) {

    const html = await view('home', {
      user: 'John Doe'
    })

    return response.send(html)
  }
}

export default HomeController
