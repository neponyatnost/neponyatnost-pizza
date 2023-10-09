import { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'

interface LinkButtonProps {
  children: React.ReactNode | string
  to: string
}

const LinkButton: FC<LinkButtonProps> = ({ children, to }) => {
  const navigate = useNavigate()

  if (to === '-1') {
    return (
      <button
        onClick={() => navigate(-1)}
        className="text-teal-500 hover:text-teal-700 hover:underline transition"
      >
        {children}
      </button>
    )
  }

  return (
    <Link
      to={to}
      className="text-teal-500 hover:text-teal-700 hover:underline transition"
    >
      {children}
    </Link>
  )
}

export default LinkButton
