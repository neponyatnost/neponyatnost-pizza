import { FC } from 'react'
import { ActionFunction, useFetcher } from 'react-router-dom'
import { updateOrder } from '../../services/apiRestaurant'
import Button from '../../ui/Button'
import { IOrderData } from './models/order'

interface UpdateOrderProps {
  order: IOrderData
}

const UpdateOrder: FC<UpdateOrderProps> = () => {
  const fetcher = useFetcher()

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button disabled={false} variant="primary">
        Make priority
      </Button>
    </fetcher.Form>
  )
}

export default UpdateOrder

export const action: ActionFunction = async ({ params }) => {
  const data = { priority: true }

  if (params.orderId) {
    await updateOrder(params.orderId, data)
  }
  return null
}
