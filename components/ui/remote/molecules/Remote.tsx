import React from "react"
import { View, StyleSheet, Dimensions } from "react-native"
import { VolumeSlider } from "../atoms/VolumeSlider"
import { DPad } from "./DPad"
import { denonSendCommand } from "../../../modules/Denon/denon"
import Button from "../atoms/Button"
import {} from "@reduxjs/toolkit"
// import appColors from "../../../assets/appColors"
import { Shadow } from "react-native-shadow-2"

const Remote = () => {
  const { width: windowWidth, height: windowHeight } = Dimensions.get("window")

  return (
    <Shadow distance={6} startColor={"#ffff0070"} endColor={"#000"}>
      <View style={styles.container}>
        <View style={styles.remoteContainer}>
          <View style={styles.controls}>
            <DPad diameter={windowHeight * 0.37} />
            <View style={styles.controlSet}>
              <Button
                variant="icon"
                title="play"
                onPress={() => {}}
                size={40}
              />
              <Button
                variant="icon"
                title="stop"
                onPress={() => {}}
                size={40}
              />
            </View>
            <View style={styles.controlSet}>
              <Button
                variant="icon"
                title="fast-backward"
                onPress={() => {}}
                size={40}
              />
              <Button
                variant="icon"
                title="fast-forward"
                onPress={() => {}}
                size={40}
              />
            </View>
          </View>
          <View style={styles.volumeSlider}>
            <VolumeSlider />
          </View>
        </View>
      </View>
    </Shadow>
  )
}

const styles = StyleSheet.create({
  // overallContainer: {
  //   position: "relative",
  //   display: "flex",
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "center"
  // },
  // outerGlow: {
  //   flex: 1,
  //   position: "absolute",
  //   height: "94%",
  //   backgroundColor: "##ffff00",
  //   opacity: 0.8,
  //   borderRadius: 25,
  //   width: "102%"
  // },
  container: {
    display: "flex",
    backgroundColor: "#263D47",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 25,
    elevation: 5,
    borderColor: "#59A5D8",
    minWidth: 300,
    paddingStart: 25,
    height: "100%"
  },
  deviceContainer: {},
  remoteContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  controls: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    width: "70%",
    height: "75%",
    maxWidth: 250
  },
  controlSet: {
    width: "60%",
    marginTop: "10%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  volumeSlider: {
    width: "30%"
  }
})

export default Remote
