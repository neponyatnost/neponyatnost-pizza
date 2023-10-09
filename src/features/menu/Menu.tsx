import { FC } from 'react'
import { useLoaderData } from 'react-router-dom'
import { getMenu } from '../../services/apiRestaurant'
import MenuItem from './MenuItem'
import { IPizza } from './models/menu'

interface MenuProps {}

const Menu: FC<MenuProps> = () => {
  // const [localMenu, setLocalMenu] = useState<IPizza[]>([])
  const menu = useLoaderData() as IPizza[]

  // useEffect(function () {
  //   async function fetchLocalMenu() {
  //     const data = await fetch('http://localhost:5173/data/menu.json')
  //     const menu = await data.json()
  //     setLocalMenu(menu.data)
  //   }
  //   fetchLocalMenu()
  // }, [])

  return (
    <>
      <ul className="divide-y divide-teal-500 px-4">
        {menu.map((pizza) => (
          <MenuItem pizza={pizza} key={pizza.id} />
        ))}
      </ul>
    </>
  )
}

export async function loader() {
  const menu = await getMenu()
  return menu
}

export default Menu
