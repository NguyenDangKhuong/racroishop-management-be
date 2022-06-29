require('dotenv').config()
import express from 'express'
import mongoose, { ConnectOptions } from 'mongoose'
import session from 'express-session'
import cors from 'cors'
import MongoStore from 'connect-mongo'
import { COOKIE_NAME, __prod__ } from './constants'
import rootRouter from './routes/root.route'
import userRouter from './routes/user.route'
import productRouter from './routes/product.route'


const mongoUrl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@quan-li-shop.hqodqd6.mongodb.net/?retryWrites=true&w=majority`

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true, 
      dbName: 'main'
    } as ConnectOptions)
    console.log('MongoDB connected, yeah')
  } catch (error) {
    console.log(`MongoDB can't connected, hic`)
    console.log(error.message)
    process.exit(1)
  }
}

connectDB()

const app = express()

// accecpt cors
app.use(
  cors({
    origin: __prod__
      ? process.env.CORS_ORIGIN_PROD
      : process.env.CORS_ORIGIN_DEV,
    credentials: true
  })
)

app.set('trust proxy', 1)

// thay thế body-parser để dùng được req.body trong route 
app.use(express.json())

//cấp session cho user trong mongoDb
app.use(
  session({
    name: COOKIE_NAME,
    store: MongoStore.create({ mongoUrl }),
    cookie: {
      maxAge: 1000 * 60 * 60, // one hour
      httpOnly: true, // JS front end cannot access the cookie
      secure: __prod__, // cookie only works in https
      sameSite: 'lax'
    },
    secret: process.env.ACCESS_TOKEN_SECRET as string,
    saveUninitialized: false, // don't save empty sessions, right from the start
    resave: false
  })
)

//dùng router
app.use('/', rootRouter)
app.use('/api/user', userRouter)
app.use('/api/products', productRouter)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
