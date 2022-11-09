import { configureStore, current, getDefaultMiddleware } from "@reduxjs/toolkit"
import volumeSlice from "./Denon/volume"
import powerSlice from "./Denon/power"
import inputSlice from "./Denon/input"
import { denonCommandApi, denonStatusApi } from "./Denon/denon"

interface InitialState {
  denonVolume: { volume: number }
  denonPower: { isPowered: boolean }
}

export const store = configureStore({
  reducer: {
    denonVolume: volumeSlice,
    denonPower: powerSlice,
    denonInput: inputSlice,
    [denonStatusApi.reducerPath]: denonStatusApi.reducer,
    [denonCommandApi.reducerPath]: denonCommandApi.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      denonStatusApi.middleware,
      denonCommandApi.middleware
    )
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
