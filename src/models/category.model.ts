import { prop, getModelForClass } from '@typegoose/typegoose'

export class Category {
  // Mongoose validation goes inside the @Props arguments
  @prop({ type: () => String, required: true, unique: true })
  name: string

  @prop({ type: () => Date })
  date: Date
}

const CategoryModel = getModelForClass(Category)

export default CategoryModel
