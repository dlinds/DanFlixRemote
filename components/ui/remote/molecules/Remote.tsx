import React from "react"
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native"
import { VolumeSlider } from "../atoms/VolumeSlider"
import { DPad } from "./DPad"
import Button from "../../atoms/Button"
import { useAppSelector, useAppDispatch } from "../../../modules/hooks"
import { setInitialPowerStatus } from "../../../modules/Denon/power"
import { Shadow } from "react-native-shadow-2"
import { useSendDenonCommandMutation } from "../../../modules/Denon/denon"
import { SendCommandParam } from "../../../modules/interfaces"
import { useRokuSendKeyPressMutation } from "../../../modules/TCL/TCL"

const Remote = () => {
  const { width: windowWidth, height: windowHeight } = Dimensions.get("window")
  const currentPowerStatus: boolean = useAppSelector(
    (state: any) => state.denonPower.isPowered
  )

  const dispatch = useAppDispatch()

  const [sendDenonCommand, result] = useSendDenonCommandMutation()
  const [sendRokuCommand, rokuResult] = useRokuSendKeyPressMutation()

  const handlePressPowerButton = () => {
    const powerOffParam: SendCommandParam = {
      command: "PW",
      parameter: "STANDBY"
    }

    const powerOnParam: SendCommandParam = {
      command: "ZM",
      parameter: "ON"
    }

    const requestParams = currentPowerStatus ? powerOffParam : powerOnParam

    sendDenonCommand(requestParams)
    sendRokuCommand(currentPowerStatus ? "PowerOff" : "PowerOn")
    dispatch(setInitialPowerStatus(!currentPowerStatus))
  }

  return (
    <Shadow distance={6} startColor={"#59A5D870"} endColor={"#000"}>
      <View style={styles.container}>
        <View style={styles.remoteContainer}>
          <View style={styles.controls}>
            <DPad
              diameter={windowHeight * 0.37}
              disabled={!currentPowerStatus ? true : false}
            />
            <View style={styles.controlSet}>
              <Button
                variant="icon"
                title="play"
                size={40}
                containerProps={
                  !currentPowerStatus && { backgroundColor: "#303030" }
                }
                childrenProps={!currentPowerStatus && { color: "#606060" }}
              />
              <Button
                variant="icon"
                title="stop"
                size={40}
                containerProps={
                  !currentPowerStatus && { backgroundColor: "#303030" }
                }
                childrenProps={!currentPowerStatus && { color: "#606060" }}
              />
            </View>
            <View style={styles.controlSet}>
              <Button
                variant="icon"
                title="fast-backward"
                size={40}
                containerProps={
                  !currentPowerStatus && { backgroundColor: "#303030" }
                }
                childrenProps={!currentPowerStatus && { color: "#606060" }}
              />
              <Button
                variant="icon"
                title="fast-forward"
                size={40}
                containerProps={
                  !currentPowerStatus && { backgroundColor: "#303030" }
                }
                childrenProps={!currentPowerStatus && { color: "#606060" }}
              />
            </View>
            <TouchableOpacity
              style={{ marginTop: "15%", zIndex: 2 }}
              onPress={() => handlePressPowerButton()}
            >
              <Shadow
                distance={currentPowerStatus ? 0 : 4}
                startColor={"#43697A"}
                endColor={currentPowerStatus ? "#263D47" : "#131E23"}
                style={styles.shadow}
              >
                <Button
                  variant="standard"
                  title={currentPowerStatus ? "Power Off" : "Power On"}
                  size={40}
                  containerProps={
                    currentPowerStatus
                      ? { backgroundColor: "#43697A" }
                      : { backgroundColor: "#79DBDB" }
                  }
                  childrenProps={
                    currentPowerStatus
                      ? { fontSize: 12, color: "white" }
                      : { fontSize: 12, color: "black" }
                  }
                />
              </Shadow>
            </TouchableOpacity>
          </View>
          <View style={styles.volumeSlider}>
            <VolumeSlider />
          </View>
        </View>
        {!currentPowerStatus && <View style={styles.overlay} />}
      </View>
    </Shadow>
  )
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 25,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 1
  },
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
    height: "100%",
    overlayColor: "black"
  },
  shadow: {
    borderRadius: 5,
    maxWidth: 131,
    elevation: 5
  },
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
