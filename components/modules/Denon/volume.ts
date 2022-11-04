import { createSlice } from "@reduxjs/toolkit"
import { callDenon } from "./denon"
import type { PayloadAction } from "@reduxjs/toolkit"
export interface VolumeState {
  volume: number
}
const initialState: VolumeState = {
  volume: 30
}

const volumeSlice = createSlice({
  name: "volume",
  initialState,
  reducers: {
    setVolumeAtTurnOn: (state, action: PayloadAction<number>) => {
      return { ...state, volume: action.payload }
    },
    increment: state => {
      const currentState = { ...state, volume: state.volume + 0.5 }
      callDenon("SEND", "MV", "UP")
      return { ...currentState }
    },
    decrement: state => {
      const currentState = { ...state, volume: state.volume - 0.5 }
      callDenon("SEND", "MV", "DOWN")
      return { ...currentState }
    },
    setExact: (state, action: PayloadAction<number>) => {
      const currentState = { ...state, volume: (state.volume = action.payload) }
      action && callDenon("SEND", "MV", action.payload)
      return { ...currentState }
    }
  }
})

export const {
  increment,
  decrement,
  setExact,
  setVolumeAtTurnOn
} = volumeSlice.actions
export default volumeSlice.reducer
