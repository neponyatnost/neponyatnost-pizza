import { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import Button from '../../ui/Button'
import { formatCurrency } from '../../utils/helpers'
import DeleteItemFromCart from '../cart/DeleteItemFromCart'
import UpdateItemQuantityInCart from '../cart/UpdateItemQuantityInCart'
import { addItemToCart, getCurrentQuantityById } from '../cart/api/cartSlice'
import { ICartItem } from '../cart/models/cart'
import { IPizza } from './models/menu'

interface MenuItemProps {
  pizza: IPizza
}

const MenuItem: FC<MenuItemProps> = ({ pizza }) => {
  const dispatch = useAppDispatch()
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza
  const currentQuantity = useAppSelector((state) =>
    getCurrentQuantityById(id)(state.cartReducer),
  )

  const isInCart = currentQuantity > 0

  const handleAddToCart = () => {
    const newItem: ICartItem = {
      pizzaId: id,
      name,
      unitPrice,
      quantity: 1,
      totalPrice: unitPrice * 1,
    }
    dispatch(addItemToCart(newItem))
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={soldOut ? 'opacity-70 h-28 grayscale' : 'h-28'}
      />
      <div className="flex flex-col grow">
        <p className="font-medium">{name}</p>
        <p className="text-sm text-stone-500 capitalize italic flex gap-2">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto text-sm flex items-center justify-between">
          {!soldOut ? (
            <p>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="uppercase text-slate-500">Sold out</p>
          )}
          {isInCart && (
            <div className="flex gap-3 sm:gap-6">
              <UpdateItemQuantityInCart
                currentQuantity={currentQuantity}
                pizzaId={id}
              />
              <DeleteItemFromCart pizzaId={id} />
            </div>
          )}
          {!soldOut && !isInCart && (
            <Button
              variant="primary"
              disabled={soldOut}
              onClick={handleAddToCart}
            >
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  )
}

export default MenuItem
