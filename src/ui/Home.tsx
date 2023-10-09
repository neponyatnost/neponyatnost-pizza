import CreateUser from '../features/user/CreateUser'
import { useAppSelector } from '../redux/hooks'
import Button from './Button'

function Home() {
  const { username } = useAppSelector((s) => s.userReducer)

  return (
    <div className="my-8 text-center px-2">
      <h1 className="text-xl font-semibold mb-4 md:text-3xl">
        The best pizza.
        <br />
        <span className="text-teal-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {username === '' ? (
        <CreateUser />
      ) : (
        <Button disabled={false} variant="primary" to="/menu">
          Continue ordering
        </Button>
      )}
    </div>
  )
}

export default Home
