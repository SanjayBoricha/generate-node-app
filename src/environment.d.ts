declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_NAME: string
      PORT: string
      HOST: string
      JWT_SECRET: string
      JWT_EXPIRE_TIME: string
      MONGO_URI_STRING: string
      MAIL_HOST: string
      MAIL_PORT: number
      MAIL_USERNAME: string
      MAIL_PASSWORD: string
      MAIL_FROM_ADDRESS: string
      MAIL_FROM_NAME: string
    }
  }
}

declare module 'express-serve-static-core' {
  export interface Request {
    user: IUser | null
  }
}

export { }
