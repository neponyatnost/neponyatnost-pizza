import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface SearchOrderProps {}

const SearchOrder: FC<SearchOrderProps> = () => {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!query) return
    navigate(`/order/${query}`)
    setQuery('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search order"
        className="w-28 rounded-full bg-teal-100 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:w-72 focus:outline-none focus:ring focus:ring-teal-200 focus:ring-offset-1 focus:ring-opacity-50 sm:w-64"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  )
}

export default SearchOrder
