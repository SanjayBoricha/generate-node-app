import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import RouteServiceProvider from './providers/RouteServiceProvider'
import mongoose from 'mongoose'
import morgan from "morgan"

dotenv.config()

const app: Express = express()

// use logger
app.use(morgan('combined'))

// use body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// mongo connection
if (process.env.MONGO_URI_STRING) {
  mongoose.connect(process.env.MONGO_URI_STRING)
}

// register service providers
new RouteServiceProvider(app).register()

process.on('uncaughtException', error => {
  console.log(error)
})

const host = process.env.HOST
const port = process.env.PORT

// start server
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://${host}:${port}`)
})