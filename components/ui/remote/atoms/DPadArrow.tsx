import React, { FC, ReactElement } from "react"
import { View, StyleSheet, Pressable } from "react-native"

export interface DPadArrowProps {
  readonly rotation: "right" | "left" | "up" | "down"
  readonly length: number
  readonly styleProps?: {}
  readonly onPress: () => void
  readonly offPress: () => void
  readonly disabled?: boolean
}

export const DPadArrow: FC<DPadArrowProps> = ({
  rotation,
  length,
  styleProps,
  onPress,
  offPress,
  disabled
}: DPadArrowProps): ReactElement => {
  const getRotate = () => {
    switch (rotation) {
      case "right":
        return { rotate: "90deg" }
      case "left":
        return { rotate: "-90deg" }
      case "up":
        return { rotate: "0deg" }
      case "down":
        return { rotate: "180deg" }
    }
  }

  const rotate = getRotate()

  const styles = StyleSheet.create({
    triangle: {
      width: 0,
      height: 0,
      backgroundColor: "transparent",
      borderStyle: "solid",
      borderLeftWidth: length,
      borderRightWidth: length,
      borderBottomWidth: length * 0.5,
      borderLeftColor: "transparent",
      borderRightColor: "transparent",
      borderBottomColor: disabled ? "#606060" : "#D9D9D9",
      ...styleProps
    }
  })

  return (
    <Pressable
      onPress={onPress}
      onPressOut={offPress}
      hitSlop={5}
      style={[
        styles.triangle,
        {
          transform: [rotate]
        }
      ]}
    ></Pressable>
  )
}
