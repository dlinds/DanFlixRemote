import { configureStore } from "@reduxjs/toolkit"
import volumeSlice from "./Denon/volume"
import powerSlice from "./Denon/power"
export const store = configureStore({
  reducer: {
    volume: volumeSlice,
    power: powerSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
