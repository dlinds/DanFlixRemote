import { transform } from "@babel/core"
import React, { FC, ReactElement, useState } from "react"
import { View, StyleSheet, Pressable } from "react-native"
// import ReactSlider from "react-slider"
import Slider, { SliderProps } from "@react-native-community/slider"
// import { Slider, Text, Icon } from "@rneui/themed"

export interface VolumeSliderProps {
  readonly styleProps?: {}
}

export const VolumeSlider: FC<VolumeSliderProps> = ({
  styleProps
}: VolumeSliderProps): ReactElement => {
  const [vertValue, setVertValue] = useState(0)
  const styles = StyleSheet.create({
    verticalContent: {
      padding: 0,
      flex: 1,
      flexDirection: "row",
      height: 500,
      justifyContent: "center",
      alignItems: "stretch"
    }
  })

  return (
    <View style={styles.verticalContent}>
      <Slider
        value={vertValue}
        onValueChange={setVertValue}
        maximumValue={100}
        minimumValue={0}
        step={1}
      />
    </View>
  )
}
