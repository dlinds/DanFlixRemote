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
}

const Button: FC<ButtonProps> = ({
  variant,
  title,
  isActiveInput,
  alternativeColor,
  onPress,
  onPressOut
}: ButtonProps) => {
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
      >
        <Text style={textStyle}>{title.toUpperCase()}</Text>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        onPress={onPress}
        onPressOut={onPressOut}
        style={styles.circleButton}
      >
        <Icon name="play" size={50} color="white" />
      </TouchableOpacity>
    )
  return renderedButton
}
const styles = StyleSheet.create({
  circleButton: {
    height: 100,
    width: 100,
    borderRadius: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "gray",
    padding: 25
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

export default Button
