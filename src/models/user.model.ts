import { prop, getModelForClass } from '@typegoose/typegoose'

enum Gender {
  male = 'Nam',
  female = 'Nữ',
  undisclosed = 'Chưa xác định'
}

class Address {
  @prop({ type: () => String })
  street: string

  @prop({ type: () => String })
  district: string

  @prop({ type: () => String })
  city: string
}

export class User {
  // Mongoose validation goes inside the @Props arguments
  @prop({ type: () => String, required: true, unique: true })
  email: string

  @prop({ type: () => String, required: true })
  username: string

  @prop({ type: () => String, required: true })
  password: string

  @prop({ type: () => String, required: true })
  phone: string

  // Enum of values male, female or undisclosed
  @prop({ type: () => String, enum: Object.values(Gender) })
  gender: string

  // Embedded sub doccument
  @prop({ type: () => Address })
  address: Address

  @prop({ type: () => Number, required: true })
  role: number

  @prop({ type: () => Date })
  date: Date

  // public get fullName() {
  //   return `${this.firstName} ${this.lastName}`;
  // }
}

const UserModel = getModelForClass(User)

export default UserModel
