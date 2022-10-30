import { transform } from "@babel/core"
import React, { FC, ReactElement, useState, useEffect } from "react"
import { View, StyleSheet, Pressable, Text } from "react-native"
import VerticalSlider from "rn-vertical-slider"
import Button from "./Button"

export interface VolumeSliderProps {
  readonly styleProps?: {}
}

export const VolumeSlider: FC<VolumeSliderProps> = ({
  styleProps
}: VolumeSliderProps): ReactElement => {
  const [vertValue, setVertValue] = useState(1)

  const handleVolumeDown = () => {
    vertValue > 0 && setVertValue(prev => prev - 1)
  }

  const handleVolumeUp = () => {
    vertValue < 100 && setVertValue(prev => prev + 1)
  }

  const handleMuteVolume = () => {
    setVertValue(1)
    setIsMuteIcon("volume-off")
    setVertValue(0)
  }

  const handleMaxVolume = () => {
    setVertValue(100)
  }

  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      height: 400
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
        onLongPress={() => setVertValue(100)}
      ></Button>
      <VerticalSlider
        value={vertValue}
        disabled={false}
        min={0}
        max={100}
        onChange={(value: number) => {
          setVertValue(value)
        }}
        width={25}
        height={300}
        step={1}
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
