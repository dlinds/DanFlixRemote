import { createSlice } from "@reduxjs/toolkit"
import { denonSendCommand, volumeStatus } from "./denon"
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
      denonSendCommand("MV", "UP")
      return { ...currentState }
    },
    decrement: state => {
      const currentState = { ...state, volume: state.volume - 0.5 }
      denonSendCommand("MV", "DOWN")
      return { ...currentState }
    },
    setExact: (state, action) => {
      const currentState = { ...state, volume: (state.volume = action.payload) }
      denonSendCommand("MV", action.payload)
      return { ...currentState }
    }
  }
})

export const { increment, decrement, setExact } = volumeSlice.actions
export default volumeSlice.reducer
