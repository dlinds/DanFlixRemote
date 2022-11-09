import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RateLimiter } from "limiter"
import { SendCommandParam } from "../interfaces"
const xmlRequest =
  '<?xml version="1.0" encoding="utf-8"?>\r\n<tx>\r\n  <cmd id="1">GetAllZonePowerStatus</cmd>\r\n   <cmd id="1">GetVolumeLevel</cmd>\r\n   <cmd id="1">GetSourceStatus</cmd>\r\n</tx>'
const limiter = new RateLimiter({ tokensPerInterval: 1, interval: 500 })

const awaitLimiter = async () => {
  const remainingMessages = await limiter.removeTokens(1)
}
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
          awaitLimiter()
          return res.text()
        }
      })
    })
  })
})

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
