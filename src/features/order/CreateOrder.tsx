import { useState } from 'react'
import {
  ActionFunction,
  Form,
  redirect,
  useActionData,
  useNavigation,
} from 'react-router-dom'
import { IErrors } from '../../models/errors'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import store from '../../redux/store'
import { createOrder } from '../../services/apiRestaurant'
import Button from '../../ui/Button'
import { formatCurrency } from '../../utils/helpers'
import EmptyCart from '../cart/EmptyCart'
import { clearCart } from '../cart/api/cartSlice'
import { fetchAddress } from '../user/api/userSlice'
import { IOrderData } from './models/order'

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  )

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false)

  const { username, address, position, status, error } = useAppSelector(
    (s) => s.userReducer,
  )

  const { cart } = useAppSelector((state) => state.cartReducer)

  const totalCartPrice = useAppSelector((state) =>
    state.cartReducer.cart.reduce((a, b) => a + b.totalPrice, 0),
  )

  const dispatch = useAppDispatch()

  const navigation = useNavigation()

  const formErrors = useActionData() as IErrors

  const isSubmitting = navigation.state === 'submitting'

  const isLoadingAddress = status === 'loading'

  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0

  const priceWithPriority = totalCartPrice + priorityPrice

  if (!cart.length) return <EmptyCart />

  const handleGetPosition = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(fetchAddress())
  }

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            type="text"
            name="customer"
            defaultValue={username}
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="mt-2 text-red-500 bg-red-100 text-xs rounded-full p-2 text-center">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full disabled:bg-stone-300"
              type="text"
              name="address"
              disabled={isLoadingAddress}
              defaultValue={address}
              required
            />
            {status === 'error' && (
              <p className="mt-2 text-red-500 bg-red-100 text-xs rounded-full p-2 text-center">
                {error}
              </p>
            )}
          </div>
          {!position.coords.latitude && !position.coords.longitude && (
            <span className="absolute right-[3px] z-50 top-[2.5px]">
              <Button
                disabled={isLoadingAddress}
                variant="small"
                getPosition={handleGetPosition}
              >
                Get
              </Button>
            </span>
          )}
        </div>

        <div className="flex items-center gap-5 mb-10">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="focus:outline-none focus:ring focus:ring-teal-200 focus:ring-offset-1 w-6 h-6 accent-teal-500"
            checked={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-semibold select-none">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.coords.latitude && position.coords.longitude
                ? `${position.coords.latitude}, ${position.coords.longitude}`
                : ''
            }
          />
          <Button disabled={isSubmitting || isLoadingAddress} variant="primary">
            {isSubmitting
              ? 'Submitting...'
              : `Order now for ${formatCurrency(priceWithPriority)}`}
          </Button>
        </div>
      </Form>
    </div>
  )
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  const order: IOrderData = {
    ...data,
    cart: JSON.parse(data.cart.toString()),
    priority: data.priority === 'on',
    customer: data.customer as string,
    status: data.status as string,
    id: data.id as string,
    estimatedDelivery: data.estimatedDelivery as string,
    orderPrice: Number(data.orderPrice),
    priorityPrice: Number(data.priorityPrice),
  }

  const errors: IErrors = {}

  if (!isValidPhone(data.phone as string)) {
    errors.phone = 'Please give us your correct phone number.'
  }

  if (Object.keys(errors).length > 0) {
    return errors
  }

  const newOrder = await createOrder(order)

  store.dispatch(clearCart())

  return redirect(`/order/${newOrder.id}`)
}

export default CreateOrder
