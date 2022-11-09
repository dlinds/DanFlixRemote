import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { DenonParameters, ReceiverInput } from "../interfaces"

const initialState: ReceiverInput = {
  id: 0,
  receiverInput: "MPLAY",
  nickname: "DanFlix",
  isActive: true
}

const inputSlice = createSlice({
  name: "input",
  initialState,
  reducers: {
    setInput: (state, action: PayloadAction<DenonParameters>) => {
      return { ...state, receiverInput: action.payload }
    }
  }
})

export const { setInput } = inputSlice.actions
export default inputSlice.reducer
