import React, { FC, useState } from "react"
import { TouchableOpacity, Text, StyleSheet, View } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"

export interface ButtonProps {
  readonly variant: "standard" | "icon"
  readonly title: string
  readonly isActiveInput?: boolean
  readonly alternativeColor?: string
  readonly size?: number
  readonly containerProps?: {}
  readonly childrenProps?: {}
}

const Button: FC<ButtonProps> = ({
  variant,
  title,
  isActiveInput,
  alternativeColor,
  size,
  containerProps,
  childrenProps
}: ButtonProps) => {
  const calcSize = size ? size : 100

  const styles = StyleSheet.create({
    circleButton: {
      height: calcSize,
      width: calcSize,
      borderRadius: calcSize / 2,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "gray",
      elevation: 5,
      ...containerProps
    },
    button: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#43697A",
      padding: 12,
      paddingLeft: 25,
      paddingRight: 25,
      borderRadius: 5,
      width: "100%",
      height: calcSize ? calcSize : 10,
      minHeight: 40,
      elevation: 5,
      ...containerProps
    },
    buttonText: {
      color: "white",
      letterSpacing: 1.5,
      fontWeight: "500",
      ...childrenProps
    },
    activeButton: {
      backgroundColor: "#79DBDB"
    },
    activeButtonText: {
      color: "black"
    },
    iconColor: {
      color: "white",
      ...childrenProps
    }
  })

  const buttonStyle = isActiveInput
    ? [styles.button, styles.activeButton]
    : styles.button

  const textStyle = isActiveInput
    ? [styles.buttonText, styles.activeButtonText]
    : styles.buttonText
  const renderedButton =
    variant === "standard" ? (
      <View style={buttonStyle}>
        <Text style={textStyle}>{title.toUpperCase()}</Text>
      </View>
    ) : (
      <View style={styles.circleButton}>
        <Icon name={title} size={calcSize / 2} {...styles.iconColor} />
      </View>
    )
  return renderedButton
}

export default Button
