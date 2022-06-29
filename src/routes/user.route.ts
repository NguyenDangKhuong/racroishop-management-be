import { list, register } from '../controllers/user.controller'
import { Router } from "express"
import { validateRegisterInput } from '../utils/validateRegisterInput'

const router: Router = Router()

router.get('/', list)
router.post('/register',[validateRegisterInput], register)

export default router