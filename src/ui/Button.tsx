import { FC } from 'react'
import { Link } from 'react-router-dom'

interface ButtonProps {
  disabled: boolean
  to?: string
  variant: 'primary' | 'small' | 'secondary' | 'rounded'
  children: React.ReactNode | string
  onClick?: () => void
  getPosition?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

interface StyleProps {
  primary: string
  small: string
  secondary: string
  rounded: string
}

const Button: FC<ButtonProps> = ({
  children,
  disabled,
  to,
  variant,
  onClick,
  getPosition,
}) => {
  const styles =
    'rounded-full bg-teal-700 hover:bg-teal-500 text-stone-100 hover:text-stone-100 transition disabled:cursor-not-allowed disabled:bg-teal-900 focus:outline-none focus:ring focus:ring-teal-300 focus:ring-offset-2 focus:bg-teal-400'

  const variants: StyleProps = {
    primary: styles + ' px-4 py-2 md:px-6 md:py-2',
    small: styles + ' px-2 py-1 md:px-3 md:py-2',
    secondary:
      'rounded-full text-stone-700 hover:text-stone-900 transition disabled:cursor-not-allowed focus:outline-none focus:ring focus:ring-stone-300 focus:ring-offset-2 focus:bg-stone-400 px-4 py-2 md:px-6 md:py-2 outline outline-stone-300 hover:bg-stone-300',
    rounded: styles + ' px-2.5 py-1 md:px-3.5 md:py-2 text-sm',
  }

  if (to) {
    return (
      <Link to={to} className={variants[variant]}>
        {children}
      </Link>
    )
  }

  if (getPosition) {
    return (
      <button
        disabled={disabled}
        className={variants[variant]}
        onClick={getPosition}
      >
        {children}
      </button>
    )
  }

  if (onClick) {
    return (
      <button
        disabled={disabled}
        className={variants[variant]}
        onClick={onClick}
      >
        {children}
      </button>
    )
  }

  return (
    <button disabled={disabled} className={variants[variant]}>
      {children}
    </button>
  )
}

export default Button
