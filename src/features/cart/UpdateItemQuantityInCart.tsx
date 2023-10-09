import { FC } from 'react'
import { useAppDispatch } from '../../redux/hooks'
import Button from '../../ui/Button'
import {
  decreaseItemQuantityInCart,
  increaseItemQuantityInCart,
} from './api/cartSlice'

interface UpdateItemQuantityInCartProps {
  pizzaId: number
  currentQuantity: number
}

const UpdateItemQuantityInCart: FC<UpdateItemQuantityInCartProps> = ({
  pizzaId,
  currentQuantity,
}) => {
  const dispatch = useAppDispatch()

  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Button
        disabled={false}
        variant="rounded"
        onClick={() => dispatch(decreaseItemQuantityInCart(pizzaId))}
      >
        -
      </Button>
      <span className="text-sm font-medium">{currentQuantity}</span>
      <Button
        disabled={false}
        variant="rounded"
        onClick={() => dispatch(increaseItemQuantityInCart(pizzaId))}
      >
        +
      </Button>
    </div>
  )
}

export default UpdateItemQuantityInCart
