import { Router } from 'express'
import {
  addProduct,
  deleteProduct,
  getListProduct,
  getProductDetails,
  updateProduct
} from '../controllers/product.controller'

const router: Router = Router()

router.get('/', getListProduct)
router.get('/:id', getProductDetails)
router.post('/', addProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)

export default router
