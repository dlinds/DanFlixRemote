import StorybookUIRoot from "./.ondevice/Storybook"
import Remote from "./components/ui/remote/molecules/Remote"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Provider } from "react-redux"
import React, { useEffect, useState } from "react"
import { store } from "./components/modules/store"
import { denonStatusApi } from "./components/modules/Denon/denon"
import { StyleSheet, Text, View } from "react-native"
import Preset from "./components/ui/preset/molecules/Preset"
import { seedInputs } from "./components/ui/preset/molecules/Preset.stories"
import Category from "./components/ui/category/molecules/Category"
import { setInitialPowerStatus } from "./components/modules/Denon/power"
import { useAppSelector, useAppDispatch } from "./components/modules/hooks"
import { setVolumeAtTurnOn } from "./components/modules/Denon/volume"
import { setInput } from "./components/modules/Denon/input"

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

const App = () => {
  const {
    isLoading,
    currentData
  } = denonStatusApi.endpoints.getInitialStatus.useQuery("") //this can be changed, see volume slider or remote

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (currentData) {
      const XMLParser = require("react-xml-parser")
      const xml = new XMLParser().parseFromString(currentData)

      const powerStatus =
        xml.children[0].children[0].value === "ON" ? true : false
      dispatch(setInitialPowerStatus(powerStatus))

      const currentVolume = parseFloat(xml.children[1].children[4].value)
      dispatch(setVolumeAtTurnOn(currentVolume))

      const currentInput = xml.children[2].children[0].value
      dispatch(setInput(currentInput))
    }
  }, [isLoading])

  const currentPowerStatus: boolean = useAppSelector(
    (state: any) => state.denonPower.isPowered
  )

  if (!isLoading) {
    return (
      <SafeAreaProvider>
        <View style={styles.container}>
          <View style={styles.selectionsContainer}>
            <View style={[styles.categoryContainer, styles.selectionContainer]}>
              <Category inputList={seedInputs} />
            </View>
            <View style={[styles.presetContainer, styles.selectionContainer]}>
              <Preset inputList={seedInputs} />
            </View>
            {!currentPowerStatus && <View style={styles.overlay} />}
          </View>
          <View style={styles.remoteContainer}>
            <Remote />
          </View>
        </View>
      </SafeAreaProvider>
    )
  }
  return (
    <View style={styles.loading}>
      <Text style={styles.loadingText}>Loading</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 25,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 1
  },
  loading: {
    flex: 1,
    backgroundColor: "#0A100D",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  loadingText: {
    color: "white",
    fontSize: 50
  },
  container: {
    flex: 1,
    backgroundColor: "#0A100D",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "1%"
  },
  selectionsContainer: {
    height: "95%",
    width: "66%",
    marginEnd: "2%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#263D47",
    padding: "3%",
    borderWidth: 2,
    borderRadius: 25,
    elevation: 5,
    borderColor: "#59A5D8"
  },
  selectionContainer: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    padding: 0
  },
  categoryContainer: {
    width: "40%",
    alignItems: "center",
    marginEnd: "10%"
  },
  presetContainer: {
    width: "50%",
    alignItems: "flex-end",
    zIndex: 2
  },
  remoteContainer: {
    width: "33%",
    height: "95%"
  }
})
const LOAD_STORYBOOK = false

export default LOAD_STORYBOOK ? StorybookUIRoot : AppWrapper
