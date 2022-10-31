import { configureStore } from "@reduxjs/toolkit"
import volumeSlice from "./Denon/volume"
const store = configureStore({
  reducer: {
    volume: volumeSlice
  }
})

export default store
