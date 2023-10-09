import { IGeopositionRoot } from '../models/geo'

export async function getAddress({
  latitude,
  longitude,
}: {
  latitude: number
  longitude: number
}) {
  const res = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`,
  )
  if (!res.ok) throw Error('Failed getting address')

  const data: IGeopositionRoot = await res.json()
  console.log(data)
  return data
}
