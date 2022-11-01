import { createSlice } from "@reduxjs/toolkit"
import { callDenon } from "./denon"

const initialState = {
  isPowered: false
}

const powerSlice = createSlice({
  name: "power",
  initialState,
  reducers: {
    getCurrentPowerStatus: state => {
      let currentState = { ...state }
      callDenon("STATUS", "PW").then(res => {
        currentState = { ...state, isPowered: res }
      })
      return { ...currentState }
    },
    powerOn: state => {
      callDenon("SEND", "PW", "ON")
      let currentState = { ...state }
      callDenon("STATUS", "PW").then(res => {
        currentState = { ...state, isPowered: res }
      })
      return { ...currentState }
    },
    powerOff: state => {
      callDenon("SEND", "PW", "STANDBY")
      let currentState = { ...state }
      callDenon("STATUS", "PW").then(res => {
        currentState = { ...state, isPowered: res }
      })
      return { ...currentState }
    }
  }
})

export const { powerOn, powerOff, getCurrentPowerStatus } = powerSlice.actions
export default powerSlice.reducer
