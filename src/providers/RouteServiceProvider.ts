import { Express } from 'express'
import ApiRoutes from '../routes/api'
import WebRoutes from '../routes/web'

class RouteServiceProvider {
  private app: Express

  constructor(app: Express) {
    this.app = app
  }

  register() {
    // API routes
    this.app.use('/api', ApiRoutes)

    // Web routes
    this.app.use('/', WebRoutes)
  }
}

export default RouteServiceProvider
