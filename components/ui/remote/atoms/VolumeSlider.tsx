import React, { FC, ReactElement, useState, useEffect } from "react"
import { View, StyleSheet, TouchableOpacity, Text } from "react-native"
import VerticalSlider from "rn-vertical-slider"
import Button from "../../atoms/Button"
import {
  increment,
  decrement,
  setExact,
  setVolumeAtTurnOn
} from "../../../modules/Denon/volume"
import { useAppSelector, useAppDispatch } from "../../../modules/hooks"
import { callDenon } from "../../../modules/Denon/denon"
import { useSendCommandMutation } from "../../../modules/store"
import { SendCommandParam } from "../../../modules/interfaces"

export interface VolumeSliderProps {
  readonly styleProps?: {}
}

export const VolumeSlider: FC<VolumeSliderProps> = ({
  styleProps
}: VolumeSliderProps): ReactElement => {
  const currentVolume: number = useAppSelector(
    (state: any) => state.denonVolume.volume
  )

  const currentPowerStatus: boolean = useAppSelector(
    (state: any) => state.denonPower.isPowered
  )

  const dispatch = useAppDispatch()
  const [sendCommand, result] = useSendCommandMutation()

  const handleVolumeDown = () => {
    const volumeDown: SendCommandParam = {
      command: "MV",
      parameter: "DOWN"
    }
    currentVolume > 0 && dispatch(decrement())
    sendCommand(volumeDown)
  }

  const handleVolumeUp = () => {
    const volumeUp: SendCommandParam = {
      command: "MV",
      parameter: "UP"
    }
    currentVolume < 70 && dispatch(increment())
    sendCommand(volumeUp)
  }

  const handleSetExactVolume = (value: number) => {
    const exactVolume: SendCommandParam = {
      command: "MV",
      parameter: value
    }
    dispatch(setExact(value))
    setIsMuteIcon(value > 0 ? "volume-down" : "volume-off")
    sendCommand(exactVolume)
  }

  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      height: "92%"
    }
  })

  const [isMuteIcon, setIsMuteIcon] = useState(
    currentVolume > 0 ? "volume-down" : "volume-off"
  )

  return (
    <View style={{ ...styles.container, ...styleProps }}>
      <TouchableOpacity
        onPress={() => handleVolumeUp()}
        onLongPress={() => handleSetExactVolume(60)}
        disabled={currentPowerStatus ? false : true}
      >
        <Button
          variant="icon"
          size={40}
          title="volume-up"
          containerProps={!currentPowerStatus && { backgroundColor: "#303030" }}
          childrenProps={!currentPowerStatus && { color: "#606060" }}
        />
      </TouchableOpacity>
      <VerticalSlider
        value={currentVolume ? currentVolume : 0}
        min={0}
        max={70}
        onChange={() => null}
        width={25}
        height={300}
        step={0.5}
        borderRadius={15}
        minimumTrackTintColor={currentPowerStatus ? "#79DBDB" : "#33666d"}
        maximumTrackTintColor={currentPowerStatus ? "#33666d" : "#303030"}
        shadowProps={{
          elevation: 5
        }}
      />
      <TouchableOpacity
        onPress={() => handleVolumeDown()}
        onLongPress={() => handleSetExactVolume(0)}
        disabled={currentPowerStatus ? false : true}
      >
        <Button
          variant="icon"
          size={40}
          title={isMuteIcon}
          containerProps={!currentPowerStatus && { backgroundColor: "#303030" }}
          childrenProps={!currentPowerStatus && { color: "#606060" }}
        />
      </TouchableOpacity>
      <Text>
        {currentVolume} {currentPowerStatus ? "true" : "false"}
      </Text>
    </View>
  )
}
