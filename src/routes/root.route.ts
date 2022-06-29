import { Router, Response } from 'express'

const router: Router = Router()

router.get('/', (_req, res: Response) =>
  res.send('Welcome to rac-roi-shop server managerment')
)

export default router
