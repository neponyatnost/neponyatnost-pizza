import { FC } from 'react'
import { useAppSelector } from '../../redux/hooks'
import { formatCurrency } from '../../utils/helpers'
import DeleteItemFromCart from './DeleteItemFromCart'
import UpdateItemQuantityInCart from './UpdateItemQuantityInCart'
import { getCurrentQuantityById } from './api/cartSlice'
import { ICartItem } from './models/cart'

interface CartItemProps {
  item: ICartItem
}

const CartItem: FC<CartItemProps> = ({ item }) => {
  const { pizzaId, name, quantity, totalPrice } = item
  const currentQuantity = useAppSelector((state) =>
    getCurrentQuantityById(pizzaId)(state.cartReducer),
  )

  return (
    <li className="py-2 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-semibold">{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantityInCart
          currentQuantity={currentQuantity}
          pizzaId={pizzaId}
        />
        <DeleteItemFromCart pizzaId={pizzaId} />
      </div>
    </li>
  )
}

export default CartItem
