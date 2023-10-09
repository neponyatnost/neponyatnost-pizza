export interface IMenuRoot {
  status: string
  data: IPizza[]
}

export interface IPizza {
  id: number
  name: string
  unitPrice: number
  imageUrl: string
  ingredients: string[]
  soldOut: boolean
}
