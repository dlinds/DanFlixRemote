import StorybookUIRoot from "./.ondevice/Storybook"
import Remote from "./components/ui/remote/molecules/Remote"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Provider } from "react-redux"
import React, { useState } from "react"
import store from "./components/modules/store"
import { View } from "react-native"
import Preset from "./components/ui/preset/molecules/Preset"
import { seedInputs } from "./components/ui/preset/molecules/Preset.stories"
const App = () => {
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
            style={{
              height: "95%",
              width: "66%",
              marginEnd: "2%",
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-around",
              backgroundColor: "#263D47",
              padding: "1.5%",
              borderWidth: 2,
              borderRadius: 25,
              elevation: 5,
              borderColor: "#59A5D8"
            }}
          >
            <View style={{ width: "45%" }}></View>
            <View
              style={{
                width: "55%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 0
              }}
            >
              <View style={{ height: "90%", width: "100%" }}>
                <Preset inputList={seedInputs} />
              </View>
            </View>
          </View>
          <View style={{ width: "33%", height: "95%" }}>
            <Remote />
          </View>
        </View>
      </SafeAreaProvider>
    </Provider>
  )
}

const LOAD_STORYBOOK = false

export default LOAD_STORYBOOK ? StorybookUIRoot : App
