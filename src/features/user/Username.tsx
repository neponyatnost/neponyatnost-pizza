import { FC } from 'react'
import { useAppSelector } from '../../redux/hooks'

interface UsernameProps {}

const Username: FC<UsernameProps> = () => {
  const { username } = useAppSelector((state) => state.userReducer)

  if (!username) return null

  return <div className="text-sm font-semibold hidden md:block">{username}</div>
}

export default Username
