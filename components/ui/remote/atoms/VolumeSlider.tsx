import React, { FC, ReactElement, useState, useEffect } from "react"
import { View, StyleSheet, TouchableOpacity, Text } from "react-native"
import VerticalSlider from "rn-vertical-slider"
import Button from "../../atoms/Button"
import {
  increment,
  decrement,
  setExact,
  setInitialState
} from "../../../modules/Denon/volume"
import { useSelector, useDispatch } from "react-redux"
import { callDenon } from "../../../modules/Denon/denon"

export interface VolumeSliderProps {
  readonly styleProps?: {}
}

export const VolumeSlider: FC<VolumeSliderProps> = ({
  styleProps
}: VolumeSliderProps): ReactElement => {
  const currentVolume: number = useSelector((state: any) => state.volume.volume)
  const dispatch = useDispatch()

  const [vertValue, setVertValue] = useState(currentVolume)

  useEffect(() => {
    callDenon("STATUS", "MV").then(res => {
      dispatch(setInitialState(res))
      setVertValue(res)
    })
  }, [])

  const handleVolumeDown = () => {
    currentVolume > 0 &&
      (setVertValue(prev => prev - 0.5), dispatch(decrement()))
  }

  const handleVolumeUp = () => {
    currentVolume < 60 &&
      (setVertValue(prev => prev + 0.5), dispatch(increment()))
  }

  const handleSetExactVolume = (value: number) => {
    setVertValue(value)
    dispatch(setExact(value))
    setIsMuteIcon(value > 0 ? "volume-down" : "volume-off")
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
    vertValue > 0 ? "volume-down" : "volume-off"
  )

  return (
    <View style={{ ...styles.container, ...styleProps }}>
      <TouchableOpacity
        onPress={() => handleVolumeUp()}
        onLongPress={() => handleSetExactVolume(60)}
      >
        <Button variant="icon" size={40} title="volume-up"></Button>
      </TouchableOpacity>
      <VerticalSlider
        value={vertValue}
        disabled={false}
        min={0}
        max={60}
        onChange={(value: number) => {
          handleSetExactVolume(value)
        }}
        width={25}
        height={300}
        step={0.5}
        borderRadius={15}
        minimumTrackTintColor={"#79DBDB"}
        maximumTrackTintColor={"#33666d"}
        shadowProps={{
          elevation: 5
        }}
      />
      <TouchableOpacity
        onPress={() => handleVolumeDown()}
        onLongPress={() => handleSetExactVolume(0)}
      >
        <Button variant="icon" size={40} title={isMuteIcon}></Button>
        <Text>{vertValue}</Text>
      </TouchableOpacity>
    </View>
  )
}
