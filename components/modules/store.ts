import { configureStore } from "@reduxjs/toolkit"
import volumeSlice from "./Denon/volume"
import powerSlice from "./Denon/power"
const store = configureStore({
  reducer: {
    volume: volumeSlice,
    power: powerSlice
  }
})

export default store
