import React from "react"
import { View, StyleSheet, Text } from "react-native"

export interface ExpandedInfoProps {
  receiverStatus: boolean
  receiverInput: string
  tvStatus: boolean
  activeRemote: string
}

const ExpandedInfo = ({
  receiverStatus,
  receiverInput,
  tvStatus,
  activeRemote
}: ExpandedInfoProps) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "transparent",
      height: "auto",
      width: "100%",
      borderColor: "gray",
      borderWidth: 3,
      borderTopWidth: 0,
      borderBottomEndRadius: 10,
      borderBottomStartRadius: 10,
      display: "flex",
      flexDirection: "column",
      padding: "2%"
    },
    text: {
      color: "white",
      letterSpacing: 2,
      fontWeight: "300",
      lineHeight: 30
    }
  })
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Receiver: {receiverStatus ? "On" : "Off"}</Text>
      <Text style={styles.text}>Input: {receiverInput}</Text>
      <Text style={styles.text}>TV Status: {tvStatus ? "On" : "Off"}</Text>
      <Text style={styles.text}>Active Remote: {activeRemote}</Text>
    </View>
  )
}

export default ExpandedInfo
