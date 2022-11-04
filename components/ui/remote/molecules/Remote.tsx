import React, { useState, useEffect } from "react"
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native"
import { VolumeSlider } from "../atoms/VolumeSlider"
import { DPad } from "./DPad"
import Button from "../../atoms/Button"
import { useAppSelector, useAppDispatch } from "../../../modules/hooks"
import {
  powerOn,
  powerOff,
  setInitialPowerStatus
} from "../../../modules/Denon/power"
import { Shadow } from "react-native-shadow-2"
import { callDenon } from "../../../modules/Denon/denon"

const Remote = () => {
  const { width: windowWidth, height: windowHeight } = Dimensions.get("window")
  const currentPowerStatus: boolean = useAppSelector(
    (state: any) => state.power.isPowered
  )

  // console.log(currentPowerStatus)

  const dispatch = useAppDispatch()

  const [isReceiverOn, setIsReceiverOn] = useState()

  useEffect(() => {
    callDenon("STATUS", "ZM").then(res => {
      dispatch(setInitialPowerStatus(res))
      setIsReceiverOn(res)
    })
  }, [])

  return (
    <Shadow distance={6} startColor={"#59A5D870"} endColor={"#000"}>
      <View style={styles.container}>
        <View style={styles.remoteContainer}>
          <View style={styles.controls}>
            <DPad diameter={windowHeight * 0.37} />
            <View style={styles.controlSet}>
              <Button variant="icon" title="play" size={40} />
              <Button variant="icon" title="stop" size={40} />
            </View>
            <View style={styles.controlSet}>
              <Button variant="icon" title="fast-backward" size={40} />
              <Button variant="icon" title="fast-forward" size={40} />
            </View>
            <TouchableOpacity
              style={{ marginTop: "15%" }}
              onPress={
                isReceiverOn
                  ? () => dispatch(powerOff())
                  : () => dispatch(powerOn())
              }
            >
              <Button
                variant="standard"
                title={isReceiverOn ? "Power Off" : "Power On"}
                size={40}
                containerProps={{ backgroundColor: "#79DBDB" }}
                textProps={{ fontSize: 12, color: "black" }}
              />
            </TouchableOpacity>
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
    height: "85%",
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
