import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RateLimiter } from "limiter"
import { RokuKeyPresses } from "../interfaces"
const limiter = new RateLimiter({ tokensPerInterval: 1, interval: 500 })

const awaitLimiter = async () => {
  const remainingMessages = await limiter.removeTokens(1)
}

export const rokuSendKeyPressApi = createApi({
  reducerPath: "rokuSendKeyPress",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.0.8:8060/keypress/"
  }),
  endpoints: builder => ({
    rokuSendKeyPress: builder.mutation({
      query: (keyPress: RokuKeyPresses) => ({
        url: keyPress,
        headers: {
          "Content-Type": "application/text"
        },
        method: "POST",
        responseHandler: res => {
          awaitLimiter()
          return res.text()
        }
      })
    })
  })
})

export const { useRokuSendKeyPressMutation } = rokuSendKeyPressApi
