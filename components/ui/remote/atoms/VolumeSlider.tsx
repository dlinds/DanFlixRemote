import { transform } from "@babel/core"
import React, { FC, ReactElement, useState } from "react"
import { View, StyleSheet, Pressable } from "react-native"
import VerticalSlider from "rn-vertical-slider"

export interface VolumeSliderProps {
  readonly styleProps?: {}
}

export const VolumeSlider: FC<VolumeSliderProps> = ({
  styleProps
}: VolumeSliderProps): ReactElement => {
  const [vertValue, setVertValue] = useState(1)
  const styles = StyleSheet.create({
    verticalContent: {
      padding: 0,
      flex: 1,
      flexDirection: "row",
      height: 500,
      justifyContent: "center",
      alignItems: "stretch",
      ...styleProps
    }
  })

  return (
    <View style={styles.verticalContent}>
      <VerticalSlider
        value={vertValue}
        disabled={false}
        min={0}
        max={100}
        onChange={(value: number) => {
          setVertValue(value)
        }}
        width={10}
        height={300}
        step={1}
        borderRadius={5}
        minimumTrackTintColor={"gray"}
        maximumTrackTintColor={"tomato"}
      />
    </View>
  )
}
