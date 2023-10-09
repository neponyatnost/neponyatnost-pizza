import { FC } from 'react'
import { useAppDispatch } from '../../redux/hooks'
import Button from '../../ui/Button'
import { removeItemFromCart } from './api/cartSlice'

interface DeleteItemFromCartProps {
  pizzaId: number
}

const DeleteItemFromCart: FC<DeleteItemFromCartProps> = ({ pizzaId }) => {
  const dispatch = useAppDispatch()

  return (
    <Button
      disabled={false}
      variant="small"
      onClick={() => dispatch(removeItemFromCart(pizzaId))}
    >
      Delete
    </Button>
  )
}

export default DeleteItemFromCart
