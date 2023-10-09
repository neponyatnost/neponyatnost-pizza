import { FC } from 'react'

interface LoaderProps {}

const Loader: FC<LoaderProps> = () => {
  return (
    <div className="absolute inset-0 bg-teal-100/10 backdrop-blur-sm flex items-center justify-center">
      <div className="loader"></div>
    </div>
  )
}

export default Loader
