import { FC } from 'react'
import LinkButton from '../../ui/LinkButton'

interface EmptyCartProps {}

const EmptyCart: FC<EmptyCartProps> = () => {
  return (
    <div className="py-4 px-2">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <p className="font-semibold mt-6 bg-stone-300 p-2 text-center">
        Your cart is still empty. Start adding some pizzas 😉
      </p>
    </div>
  )
}

export default EmptyCart
