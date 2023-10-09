import { FC } from 'react'
import {
  ActionFunction,
  createBrowserRouter,
  LoaderFunction,
  RouterProvider,
} from 'react-router-dom'
import Cart from './features/cart/Cart'
import Menu, { loader as menuLoader } from './features/menu/Menu'
import CreateOrder, {
  action as createOrderAction,
} from './features/order/CreateOrder'
import Order, { loader as orderLoader } from './features/order/Order'
import { action as updateOrderAction } from './features/order/UpdateOrder'
import AppLayout from './ui/AppLayout'
import Error from './ui/Error'
import Home from './ui/Home'

interface AppProps {}

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/menu',
        element: <Menu />,
        errorElement: <Error />,
        loader: menuLoader as LoaderFunction,
      },
      {
        path: '/cart',
        element: <Cart />,
        errorElement: <Error />,
      },
      {
        path: '/order/new',
        element: <CreateOrder />,
        errorElement: <Error />,
        action: createOrderAction as ActionFunction,
      },
      {
        path: '/order/:orderId',
        element: <Order />,
        errorElement: <Error />,
        loader: orderLoader as LoaderFunction,
        action: updateOrderAction,
      },
    ],
  },
])

const App: FC<AppProps> = () => {
  return <RouterProvider router={router} />
}

export default App
