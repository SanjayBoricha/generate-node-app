import { Express } from 'express'
import ApiRoutes from '../routes/api'

class RouteServiceProvider {
  private app: Express

  constructor(app: Express) {
    this.app = app
  }

  register() {
    this.app.use('/api', ApiRoutes)
  }
}

export default RouteServiceProvider
