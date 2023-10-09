import { IPosition } from '../api/userSlice'

export interface IUser {
  username: string
  status: 'idle' | 'loading' | 'error'
  position: IPosition
  address: string
  error?: string
}
