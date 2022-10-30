import StorybookUIRoot from "./.ondevice/Storybook"
import Remote from "./components/ui/remote/molecules/Remote"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { configureStore } from "@reduxjs/toolkit"
import { Provider } from "react-redux"
import React, { useState } from "react"
import { volumeStatus } from "./components/modules/Denon/denon"
import { View } from "react-native"
// import { appColors } from "./components/assets/appColors"
const App = () => {
  const [currentVolume, setCurrentVolume] = useState()

  const getCurrentVolume = async () => {
    await volumeStatus().then(res => setCurrentVolume(res))
  }

  const rootReducer = (
    state = { currentVolume: currentVolume },
    action: any
  ) => {
    getCurrentVolume()
    return state
  }

  const store = configureStore({ reducer: rootReducer })
  console.log(currentVolume)

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <View
          style={{
            flex: 1,
            backgroundColor: "#0A100D",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: "1%"
          }}
        >
          <View
            style={{ height: "95%", width: "66%", backgroundColor: "pink" }}
          ></View>
          <View style={{ width: "33%", height: "95%" }}>
            <Remote />
          </View>
        </View>
      </SafeAreaProvider>
    </Provider>
  )
}

const LOAD_STORYBOOK = true

export default LOAD_STORYBOOK ? StorybookUIRoot : App
