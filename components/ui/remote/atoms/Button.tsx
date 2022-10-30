import React, { FC, useState } from "react"
import { TouchableOpacity, Text, StyleSheet } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"

export interface ButtonProps {
  readonly variant: "standard" | "icon"
  readonly title: string
  readonly isActiveInput?: boolean
  readonly alternativeColor?: string
  readonly onPress: () => void
  readonly onPressOut?: () => void
  readonly onLongPress?: () => void
  readonly size?: number
}

const Button: FC<ButtonProps> = ({
  variant,
  title,
  isActiveInput,
  alternativeColor,
  onPress,
  onPressOut,
  onLongPress,
  size = 100
}: ButtonProps) => {
  const styles = StyleSheet.create({
    circleButton: {
      height: size,
      width: size,
      borderRadius: size / 2,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "gray",
      elevation: 5
    },
    button: {
      alignItems: "center",
      backgroundColor: "#33666d",
      padding: 12,
      marginBottom: 20,
      paddingLeft: 25,
      paddingRight: 25,
      borderRadius: 5,
      width: "70%",
      elevation: 5
    },
    buttonText: {
      color: "white",
      letterSpacing: 1.5,
      fontWeight: "500"
    },
    activeButton: {
      backgroundColor: "#79DBDB"
    },
    activeButtonText: {
      color: "black"
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
      <TouchableOpacity
        style={buttonStyle}
        onPress={onPress}
        onPressOut={onPressOut}
        onLongPress={onLongPress}
      >
        <Text style={textStyle}>{title.toUpperCase()}</Text>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        onPress={onPress}
        onPressOut={onPressOut}
        onLongPress={onLongPress}
        style={styles.circleButton}
      >
        <Icon name={title} size={size / 2} color="white" />
      </TouchableOpacity>
    )
  return renderedButton
}

export default Button
