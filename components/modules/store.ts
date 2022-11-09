import { configureStore, current, getDefaultMiddleware } from "@reduxjs/toolkit"
import volumeSlice from "./Denon/volume"
import powerSlice from "./Denon/power"
import inputSlice from "./Denon/input"
import { callDenon } from "../modules/Denon/denon"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RateLimiter } from "limiter"
import { SendCommandParam } from "./interfaces"
export const XMLParser = require("react-xml-parser")

interface InitialState {
  denonVolume: { volume: number }
  denonPower: { isPowered: boolean }
}

const xmlRequest =
  '<?xml version="1.0" encoding="utf-8"?>\r\n<tx>\r\n  <cmd id="1">GetAllZonePowerStatus</cmd>\r\n   <cmd id="1">GetVolumeLevel</cmd>\r\n   <cmd id="1">GetSourceStatus</cmd>\r\n</tx>'

export const denonStatusApi = createApi({
  reducerPath: "denonStatusApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.0.55:8080/goform/AppCommand.xml"
  }),
  endpoints: builder => ({
    getInitialStatus: builder.query({
      query: ({ baseUrl }) => ({
        url: baseUrl,
        headers: {
          "Content-Type": "application/xml"
        },
        body: xmlRequest,
        method: "POST",
        responseHandler: res => {
          return res.text()
        }
      })
    })
  })
})

const limiter = new RateLimiter({ tokensPerInterval: 1, interval: 500 })

const awaitLimiter = async () => {
  const remainingMessages = await limiter.removeTokens(1)
}

export const denonCommandApi = createApi({
  reducerPath: "denonCommandApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.0.55:8080/goform/formiPhoneAppDirect.xml"
  }),
  endpoints: builder => ({
    sendCommand: builder.mutation({
      query: ({ command, parameter }: SendCommandParam) => ({
        url: `?${command}${parameter}`,
        headers: {
          "Content-Type": "application/text"
        },
        method: "GET",
        responseHandler: res => {
          awaitLimiter()
          return res.text()
        }
      })
    })
  })
})

export const { useGetInitialStatusQuery } = denonStatusApi
export const { useSendCommandMutation } = denonCommandApi

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
