import React, { FC, ReactElement, useState } from "react"
import { View, StyleSheet, Text, Pressable } from "react-native"

export interface DPadSelectProps {
  readonly diameter: number
  readonly styleProps?: {}
}

export const DPadSelect: FC<DPadSelectProps> = ({
  styleProps,
  diameter
}: DPadSelectProps): ReactElement => {
  const [circleColor, setCircleColor] = useState("#59A5D8")

  const styles = StyleSheet.create({
    circle: {
      borderColor: circleColor,
      borderWidth: diameter * 0.25,
      height: diameter,
      width: diameter,
      borderRadius: diameter / 2,
      flex: 0,
      justifyContent: "center",
      alignItems: "center",
      ...styleProps
    },
    select: {
      color: "white",
      fontFamily: "sans-serif",
      fontSize: 24
    }
  })

  return (
    <Pressable
      onPress={() => setCircleColor("#265c81")}
      onPressOut={() => setCircleColor("#59A5D8")}
      style={styles.circle}
    >
      <Text style={styles.select}>OK</Text>
    </Pressable>
  )
}
