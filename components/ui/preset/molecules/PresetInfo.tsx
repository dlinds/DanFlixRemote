import React from "react"
import { View, StyleSheet, Text } from "react-native"
import Button from "../../atoms/Button"
import ExpandedInfo from "../atoms/ExpandedInfo"

export interface PresetInfoProps {
  readonly isActive: boolean
  readonly inputName: string
}

const PresetInfo = ({ isActive, inputName }: PresetInfoProps) => {
  const styles = StyleSheet.create({
    container: {
      height: "auto",
      width: "auto",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      borderRadius: 6,
      elevation: 10
      // backgroundColor: "pink"
    }
  })

  return (
    <View style={styles.container}>
      <Button
        variant="standard"
        title={inputName}
        containerProps={{ alignItems: "flex-start", marginTop: 4 }}
        textProps={{ letterSpacing: 5 }}
        isActiveInput={isActive}
      />
      {isActive && (
        <ExpandedInfo
          receiverStatus={true}
          receiverInput={inputName}
          tvStatus={true}
          activeRemote={inputName}
        />
      )}
    </View>
  )
}

export default PresetInfo
