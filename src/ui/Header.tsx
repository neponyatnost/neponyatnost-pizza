import { FC } from 'react'
import { Link } from 'react-router-dom'
import SearchOrder from '../features/order/SearchOrder'
import Username from '../features/user/Username'

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  return (
    <header className="flex items-center justify-between bg-teal-500 uppercase py-2 px-4 sm:px-6  border-b-2 border-slate-500">
      <Link to={'/'} className="tracking-widest mr-2">
        Pizza
      </Link>
      <SearchOrder />
      <Username />
    </header>
  )
}

export default Header
