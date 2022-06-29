interface Address {
  street: string
  district: string
  city: string
}

export interface RegisterInput {
  username: string
  email: string
  password: string
  phone: string
  gender: string
  address: Address
  role: number
}
