import React, { FC, ReactElement, useState } from "react"
import { View, StyleSheet } from "react-native"
import { DPadArrow } from "../atoms/DPadArrow"
import { DPadSelect } from "../atoms/DPadSelect"
import { VolumeSlider } from "../atoms/VolumeSlider"
export interface DPadProps {
  readonly diameter: number
}

export const DPad: FC<DPadProps> = ({ diameter }: DPadProps): ReactElement => {
  const [tappedBorder, setTappedBorder] = useState({})

  const handleOnDPadTap = (direction: string) => {
    setTappedBorder({
      [direction]: diameter * 0.05
    })
  }

  const styles = StyleSheet.create({
    container: {
      width: diameter,
      height: diameter,
      borderRadius: diameter / 2,
      borderWidth: diameter * 0.02,
      backgroundColor: "#488cba",
      borderColor: "#D3D3D3",
      boxShadow:
        "0px 4px 4px rgba(0, 0, 0, 0.25), 0px -4px 4px rgba(0, 0, 0, 0.25)",
      display: "flex",
      justifyContent: "center",
      ...tappedBorder
    }
  })
  return (
    <View style={styles.container}>
      <DPadArrow
        rotation="right"
        styleProps={{
          top: "43%",
          left: "65%"
        }}
        length={diameter / 4}
        onPress={() => handleOnDPadTap("borderLeftWidth")}
        offPress={() => setTappedBorder({})}
      />
      <DPadArrow
        rotation="left"
        styleProps={{
          top: "43%",
          right: "65%"
        }}
        length={diameter / 4}
        onPress={() => handleOnDPadTap("borderRightWidth")}
        offPress={() => setTappedBorder({})}
      />
      <DPadArrow
        rotation="up"
        styleProps={{
          top: "3%",
          left: "25%"
        }}
        length={diameter / 4}
        onPress={() => handleOnDPadTap("borderBottomWidth")}
        offPress={() => setTappedBorder({})}
      />
      <DPadArrow
        rotation="down"
        styleProps={{
          bottom: "3%",
          left: "25%"
        }}
        length={diameter / 4}
        onPress={() => handleOnDPadTap("borderTopWidth")}
        offPress={() => setTappedBorder({})}
      />
      <DPadSelect
        diameter={diameter / 2}
        styleProps={{
          position: "absolute",
          alignSelf: "center",
          justifySelf: "center"
        }}
      />
    </View>
  )
}
