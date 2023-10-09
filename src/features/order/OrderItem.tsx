import { FC } from 'react'
import { formatCurrency } from '../../utils/helpers'
import { ICartItem } from '../cart/models/cart'

interface OrderItemProps {
  item: ICartItem
  isLoadingIngredients?: boolean
  ingredients?: string[]
}

const OrderItem: FC<OrderItemProps> = ({
  item,
  isLoadingIngredients,
  ingredients,
}) => {
  const { name, quantity, totalPrice } = item

  return (
    <li className="py-3">
      <div className="flex items-center justify-between gap-4 text-sm">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="text-sm capitalize text-slate-500 italic">
        {isLoadingIngredients ? 'Loading...' : ingredients?.join(', ')}
      </p>
    </li>
  )
}

export default OrderItem
