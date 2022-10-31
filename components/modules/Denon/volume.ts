import { createSlice } from "@reduxjs/toolkit"
import { volumeStatus } from "./denon"
const getCurrentVolume = async () => {
  await volumeStatus().then(res => {
    initialState.volume = res
  })
}

const initialState = {
  volume: 0
}

getCurrentVolume()

const volumeSlice = createSlice({
  name: "volume",
  initialState,
  reducers: {
    increment: state => {
      const currentState = { ...state, volume: state.volume + 0.5 }
      return { ...currentState }
    },
    decrement: state => {
      const currentState = { ...state, volume: state.volume - 0.5 }
      return { ...currentState }
    },
    setExact: (state, action) => {
      const currentState = { ...state, volume: (state.volume = action.payload) }
      return { ...currentState }
    }
  }
})

export const { increment, decrement, setExact } = volumeSlice.actions
export default volumeSlice.reducer
