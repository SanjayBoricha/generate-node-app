import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import RouteServiceProvider from './providers/RouteServiceProvider'
import mongoose from 'mongoose'
// import compression from 'compression'

dotenv.config()

const app: Express = express()

// use body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// use compression for response
// app.use(compression())

mongoose.connect(process.env.MONGO_URI_STRING || '');

// root route
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})

// register service providers
new RouteServiceProvider(app).register()

const port = process.env.PORT || 4000
const host = process.env.HOST || 'localhost'

process.on('uncaughtException', error => {
  console.log(error);
})

// start server
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://${host}:${port}`)
})
