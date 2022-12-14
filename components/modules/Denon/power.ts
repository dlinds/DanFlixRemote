import { createSlice } from "@reduxjs/toolkit"
import { callDenon } from "./denon"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface PowerState {
  isPowered: boolean
}
const initialState: PowerState = {
  isPowered: false
}

export const powerSlice = createSlice({
  name: "power",
  initialState,
  reducers: {
    setInitialPowerStatus: (state, action: PayloadAction<boolean>) => {
      return { ...state, isPowered: action.payload }
    }
  }
})

export const { setInitialPowerStatus } = powerSlice.actions
export default powerSlice.reducer
