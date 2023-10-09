import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import Button from '../../ui/Button'
import LinkButton from '../../ui/LinkButton'
import CartItem from './CartItem'
import EmptyCart from './EmptyCart'
import { clearCart } from './api/cartSlice'

function Cart() {
  const { username } = useAppSelector((s) => s.userReducer)
  const { cart } = useAppSelector((state) => state.cartReducer)
  const dispatch = useAppDispatch()

  if (!cart.length) return <EmptyCart />

  return (
    <div className="py-3 px-4">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-8 text-xl font-semibold">Your cart, {username}</h2>

      <ul className="divide-y divide-teal-500 border-b border-teal-500 mt-3">
        {cart.map((i) => (
          <CartItem key={i.name} item={i} />
        ))}
      </ul>

      <div className="mt-6 space-x-2">
        <Button to="/order/new" disabled={false} variant="primary">
          Order pizzas
        </Button>
        <Button
          variant="secondary"
          disabled={!cart.length}
          onClick={() => dispatch(clearCart())}
        >
          Clear cart
        </Button>
      </div>
    </div>
  )
}

export default Cart
