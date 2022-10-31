import React, { FC, ReactElement, useState, useEffect } from "react"
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  TouchableOpacity
} from "react-native"
import VerticalSlider from "rn-vertical-slider"
import { denonSendCommand, volumeStatus } from "../../../modules/Denon/denon"
import Button from "../../atoms/Button"
import { increment, decrement, setExact } from "../../../modules/Denon/volume"
import { useSelector, useDispatch } from "react-redux"

export interface VolumeSliderProps {
  readonly styleProps?: {}
}

export const VolumeSlider: FC<VolumeSliderProps> = ({
  styleProps
}: VolumeSliderProps): ReactElement => {
  const currentVolume: number = useSelector((state: any) => state.volume.volume)
  const dispatch = useDispatch()

  const [vertValue, setVertValue] = useState(currentVolume)

  const handleVolumeDown = () => {
    currentVolume > 0 &&
      (setVertValue(prev => prev - 0.5),
      dispatch(decrement()),
      denonSendCommand("MV", "DOWN"))
  }

  const handleVolumeUp = () => {
    currentVolume < 60 &&
      (setVertValue(prev => prev + 0.5),
      dispatch(increment()),
      denonSendCommand("MV", "UP"))
  }

  const handleSetExactVolume = (value: number) => {
    setVertValue(value)
    dispatch(setExact(value))
    denonSendCommand("MV", value)
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
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => handleVolumeUp()}
        onLongPress={() => handleSetExactVolume(60)}
      >
        <Button variant="icon" size={40} title="volume-up"></Button>
      </TouchableOpacity>
      <VerticalSlider
        value={currentVolume}
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
      </TouchableOpacity>
    </View>
  )
}
