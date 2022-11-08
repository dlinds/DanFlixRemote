import { createSlice } from "@reduxjs/toolkit"
import { callDenon } from "./denon"
import type { PayloadAction } from "@reduxjs/toolkit"

interface InputState {
  currentInput: string
}
const initialState: InputState = {
  currentInput: "MPLAY"
}

const inputSlice = createSlice({
  name: "input",
  initialState,
  reducers: {
    setInput: (state, action: PayloadAction<string>) => {
      callDenon("SEND", "SI", "ON")
      return { ...state, currentInput: action.payload }
    }
  }
})

export const { setInput } = inputSlice.actions
export default inputSlice.reducer
