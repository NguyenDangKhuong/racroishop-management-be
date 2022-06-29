import { Request, Response } from 'express'
import ProductModel, { Product } from '../models/product.model'

const getListProduct = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  const allProducts: Product[] = await ProductModel.find()
  return res.status(200).json(allProducts)
}

const getProductDetails = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params
  const product: Product | null = await ProductModel.findById(id)
  return res.status(200).json(product)
}

const addProduct = async (req: Request, res: Response): Promise<Response> => {
  const product: Product = await ProductModel.create({ ...req.body })
  return res.status(201).json(product)
}

const updateProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params
  await ProductModel.updateOne({ id }, req.body)
  const updatedProduct: Product | null = await ProductModel.findById(id)
  return res.status(200).json(updatedProduct)
}

const deleteProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params
  const deletedProduct: Product | null = await ProductModel.findOneAndDelete({ id })
  return res.status(200).json(deletedProduct)
}

export {
  getListProduct,
  getProductDetails,
  addProduct,
  updateProduct,
  deleteProduct
}
