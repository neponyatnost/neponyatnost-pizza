import { ICartItem } from '../../cart/models/cart'

export interface IOrderRoot {
  status: string
  data: IOrderData
}

export interface IOrderData {
  customer: string
  status: string
  priority: boolean
  cart: ICartItem[]
  id: string
  estimatedDelivery: string
  orderPrice: number
  priorityPrice: number
}
