// Test ID: IIDSAT

import { useEffect } from 'react'
import { LoaderFunction, useFetcher, useLoaderData } from 'react-router-dom'
import { getOrder } from '../../services/apiRestaurant'
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers'
import { IPizza } from '../menu/models/menu'
import OrderItem from './OrderItem'
import UpdateOrder from './UpdateOrder'
import { IOrderRoot } from './models/order'

function Order() {
  const order = useLoaderData() as IOrderRoot

  const fetcher = useFetcher()

  const fetcherData: IPizza[] = fetcher.data

  useEffect(() => {
    if (!fetcher.data && fetcher.state === 'idle') {
      fetcher.load('/menu')
    }
  }, [fetcher])

  const {
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    id,
    cart,
  } = order.data

  const deliveryIn = calcMinutesLeft(estimatedDelivery)

  if (fetcherData) {
    return (
      <div className="px-4 py-6 space-y-8">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h2 className="text-xl font-semibold">Status #{id} order</h2>

          <div className="space-x-2 flex flex-wrap gap-2">
            {priority && (
              <span className="rounded-full uppercase text-red-100 bg-red-400 font-semibold text-sm px-3 py-1">
                Priority
              </span>
            )}
            <span className="rounded-full uppercase text-teal-100 bg-teal-400 font-semibold text-sm px-3 py-1">
              {status} order
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-2 bg-stone-300 py-6 px-5">
          <p className="font-medium">
            {deliveryIn >= 0
              ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
              : 'Order should have arrived'}
          </p>
          <p className="text-xs text-slate-500">
            (Estimated delivery: {formatDate(estimatedDelivery)})
          </p>
        </div>

        <ul className="divide-y divide-teal-500 border-b border-t border-teal-500">
          {cart.map((i) => (
            <OrderItem
              item={i}
              key={i.pizzaId}
              isLoadingIngredients={fetcher.state === 'loading'}
              ingredients={
                fetcherData.find((el) => el.id === i.pizzaId)?.ingredients
              }
            />
          ))}
        </ul>

        <div className="space-y-2 bg-stone-300 px-5 py-6">
          <p className="text-sm font-medium text-stone-600">
            Price pizza: {formatCurrency(orderPrice)}
          </p>
          {priority && (
            <p className="text-sm font-medium text-stone-600">
              Price priority: {formatCurrency(priorityPrice)}
            </p>
          )}
          <p className="font-bold">
            To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
          </p>
        </div>
        {!priority && <UpdateOrder order={order.data} />}
      </div>
    )
  }
}

export const loader: LoaderFunction = async ({ params }) => {
  if (params.orderId) {
    const order = await getOrder(params.orderId)
    return order
  }
}

export default Order
