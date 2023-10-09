import { FC } from 'react'
import { useRouteError } from 'react-router-dom'
import LinkButton from './LinkButton'

interface ErrorProps {}

const Error: FC<ErrorProps> = () => {
  const error = useRouteError() as any

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.data}</p>
      <p>{error.message}</p>

      <LinkButton to={'-1'}>&larr; Go back</LinkButton>
    </div>
  )
}

export default Error
