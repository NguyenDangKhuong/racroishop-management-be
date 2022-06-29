import { RequestHandler } from 'express'
import { RegisterInput } from '../types/users/RegisterInput'

//custom middleware for request
// @ts-ignore: Unreachable code error
export const validateRegisterInput: RequestHandler = (req, res, next) => {
  const registerInput: RegisterInput = req.body
  const { email, username, password } = registerInput
  console.log(req.body, registerInput)
  if (!email.includes('@'))
    return res.status(400).send({
      message: 'Email không đúng định dạng',
      errors: [{ field: 'email', message: 'Email không đúng định dạng' }]
    })
  if (username.length <= 2)
    return res.status(400).send({
      message: 'Tên không đúng',
      errors: [
        {
          field: 'username',
          message: 'Tên đã nhập bắt buộc phải trên 2 kí tự'
        }
      ]
    })
  if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(username))
    return res.status(400).send({
      message: 'Invalid username',
      errors: [
        { field: 'username', message: `Tên không được chứa kí tự đặc biệt` }
      ]
    })
  if (password.length < 2)
    return res.status(400).send({
      message: 'Invalid password',
      errors: [
        {
          field: 'password',
          message: 'Password nhập phải trên 2 kí tự'
        }
      ]
    })

  next()
}
