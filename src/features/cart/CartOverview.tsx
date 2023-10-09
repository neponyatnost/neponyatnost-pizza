import { FC } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../redux/hooks'
import { formatCurrency } from '../../utils/helpers'

interface CartOverviewProps {}

const CartOverview: FC<CartOverviewProps> = () => {
  const totalCartQuantity = useAppSelector((state) =>
    state.cartReducer.cart.reduce((a, b) => a + b.quantity, 0),
  )
  const totalCartPrice = useAppSelector((state) =>
    state.cartReducer.cart.reduce((a, b) => a + b.totalPrice, 0),
  )

  if (!totalCartQuantity) return null

  return (
    <div
      className="bg-stone-700 uppercase text-stone-300 px-4 py-4 sm:px-6 text-sm sm:text-base
    flex justify-between items-center"
    >
      <p className="space-x-4 font-semibold text-stone-300">
        <span>{totalCartQuantity} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  )
}

export default CartOverview
