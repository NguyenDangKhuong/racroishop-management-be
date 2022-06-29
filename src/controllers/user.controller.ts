import { Request, Response } from 'express'
import argon2 from 'argon2'
import User from '../models/user.model'
// import { validateRegisterInput } from '../utils/validateRegisterInput';

const list = async (_req: Request, res: Response) => {
  try {
    const users = await User.find({}).select('username')
    return res.status(200).json(users)
  } catch (err) {
    console.error(err.message)
    return res.status(400).send(err.errors)
  }
}

const register = async (req: Request, res: Response) => {
  console.log(req)
  try {
    const {
      email,
      username,
      password,
      phone,
      gender,
      address,
      role = 1
    } = req.body
    const existingUser = await User.findOne({
      where: [{ username }, { email }]
    })
    if (existingUser)
      return res.status(400).json({
        errors: [
          {
            field: existingUser.username === username ? 'username' : 'email',
            message: `${
              existingUser.username === username ? 'Username' : 'Email'
            } đã được dùng`
          }
        ]
      })

    const hashedPassword = await argon2.hash(password)
    const newUser = User.create({
      username,
      password: hashedPassword,
      email,
      phone,
      gender,
      address,
      role
    })

    // await newUser.save() 

    // req.session.userId = newUser.id

    return res.status(200).send('Đã đăng kí tài khoản thành công!').json({user: newUser})
  } catch (err) {
    console.error(err.message)
    return res.status(400).send(err.errors)
  }
}

export { list, register }
