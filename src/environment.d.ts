declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string
      HOST: string
      JWT_SECRET: string
      JWT_EXPIRE_TIME: string
      MONGO_URI_STRING: string
    }
  }
}

declare module 'express-serve-static-core' {
  export interface Request {
    user: IUser | null
  }
}

export { }
