import { createSlice } from "@reduxjs/toolkit"
import { callDenon } from "./denon"

const initialState = {
  volume: 30
}

const volumeSlice = createSlice({
  name: "volume",
  initialState,
  reducers: {
    setInitialState: (state, action) => {
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
    setExact: (state, action?) => {
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
  setInitialState
} = volumeSlice.actions
export default volumeSlice.reducer
