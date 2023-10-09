import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../redux/hooks'
import Button from '../../ui/Button'
import { updateName } from './api/userSlice'

interface CreateUserProps {}

const CreateUser: FC<CreateUserProps> = () => {
  const [username, setUsername] = useState('')

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!username) return

    dispatch(updateName(username))

    navigate('/menu')
  }

  return (
    <form onSubmit={handleSubmit} className="">
      <p className="mb-4 text-xl sm:text-base px-2">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        className="w-72 input mb-6"
        onChange={(e) => setUsername(e.target.value)}
      />

      {username !== '' && (
        <div>
          <Button variant="primary" disabled={false}>
            Start ordering
          </Button>
        </div>
      )}
    </form>
  )
}

export default CreateUser
