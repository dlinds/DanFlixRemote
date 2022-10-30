import { transform } from "@babel/core"
import React, { FC, ReactElement, useState, useEffect } from "react"
import { View, StyleSheet, Pressable, Text } from "react-native"
import VerticalSlider from "rn-vertical-slider"
import { denonSendCommand, volumeStatus } from "../../../modules/Denon/denon"
import Button from "../../atoms/Button"

export interface VolumeSliderProps {
  readonly styleProps?: {}
}

export const VolumeSlider: FC<VolumeSliderProps> = ({
  styleProps
}: VolumeSliderProps): ReactElement => {
  const [vertValue, setVertValue] = useState(0)
  const getCurrentVolume = async () => {
    await volumeStatus().then(res => {
      setVertValue(res)
    })
  }
  useEffect(() => {
    getCurrentVolume()
  }, [])

  const handleVolumeDown = () => {
    vertValue > 0 && setVertValue(prev => prev - 0.5)
    denonSendCommand("MV", "DOWN")
  }

  const handleVolumeUp = () => {
    vertValue < 60 && setVertValue(prev => prev + 0.5)
    denonSendCommand("MV", "UP")
  }

  const handleMuteVolume = () => {
    setVertValue(1)
    setIsMuteIcon("volume-off")
    setVertValue(0)
    denonSendCommand("MV", 0)
  }

  const handleSetExactVolume = (value: number) => {
    setVertValue(value)
    denonSendCommand("MV", value)
  }

  const handleMaxVolume = () => {
    setVertValue(60)
    denonSendCommand("MV", 60)
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

  useEffect(() => {
    vertValue === 0 ? setIsMuteIcon("volume-off") : setIsMuteIcon("volume-down")
  }, [vertValue])

  return (
    <View style={styles.container}>
      <Button
        variant="icon"
        size={40}
        title="volume-up"
        onPress={() => handleVolumeUp()}
        onLongPress={() => handleMaxVolume()}
      ></Button>
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
      <Button
        variant="icon"
        size={40}
        title={isMuteIcon}
        onPress={() => handleVolumeDown()}
        onLongPress={() => handleMuteVolume()}
      ></Button>
    </View>
  )
}
