// import getAddress from '../../../services/apiGeocoding'

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getAddress } from '../../../services/apiGeocoding'
import { IUser } from '../models/user'

export interface IPosition {
  coords: {
    latitude: number
    longitude: number
  }
}

function getPosition(): Promise<IPosition> {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

export const fetchAddress = createAsyncThunk(
  'user/fetchAddress',
  async function () {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition()
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    }

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position)
    const address = `${addressObj?.city}, ${addressObj?.countryName}`

    // 3) Then we return an object with the data that we are interested in
    return { position, address }
  },
)

const initialState: IUser = {
  username: '',
  status: 'idle',
  position: {
    coords: {
      latitude: 0,
      longitude: 0,
    },
  },
  address: '',
  error: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateName(state, action: PayloadAction<string>) {
      state.username = action.payload
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state, _action) => {
        state.status = 'loading'
      })
      .addCase(fetchAddress.fulfilled, (state, _action) => {
        state.position.coords = _action.payload.position
        state.address = _action.payload.address
        state.status = 'idle'
      })
      .addCase(fetchAddress.rejected, (state, _action) => {
        state.status = 'error'
        state.error = _action.error.message
      }),
})

export const { updateName } = userSlice.actions

export default userSlice.reducer
