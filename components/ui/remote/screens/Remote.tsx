import React from "react"
import { View, StyleSheet, TouchableOpacity, Text, Alert } from "react-native"
import { VolumeSlider } from "../atoms/VolumeSlider"
import { DPad } from "../molecules/DPad"

import Button from "../atoms/Button"

const Remote = () => {
  return (
    <View style={styles.container}>
      <View style={styles.emptySpace}></View>
      <View style={styles.center}>
        <DPad diameter={250} />
        <View style={styles.controls}>
          <View style={styles.controlSet}>
            <Button variant="icon" title="play" onPress={() => {}} />
            <Button variant="icon" title="stop" onPress={() => {}} />
          </View>
          <View style={styles.controlSet}>
            <Button variant="icon" title="fast-backward" onPress={() => {}} />
            <Button variant="icon" title="fast-forward" onPress={() => {}} />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            variant="standard"
            title="DanFlix"
            onPress={() => {
              console.log("getDenonStatus")
            }}
          />
          <Button variant="standard" title="ChromeCast" onPress={() => {}} />
          <Button variant="standard" title="Switch" onPress={() => {}} />
        </View>
        <Button variant="standard" title="devices" onPress={() => {}} />
      </View>
      <View style={styles.volumeSlider}>
        <VolumeSlider />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#263d47",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },
  emptySpace: {
    width: "20%",
    height: "100%"
  },
  center: {
    height: "75%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "65%"
  },
  controls: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 25,
    width: "70%"
  },
  controlSet: {
    width: 150,
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%"
  },
  volumeSlider: {
    width: "20%",
    height: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
})

export default Remote
