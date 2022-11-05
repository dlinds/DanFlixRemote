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
      elevation: 5
    }
  })

  return (
    <View style={styles.container}>
      <Button
        variant="standard"
        title={inputName}
        containerProps={{
          alignItems: "flex-start",
          paddingLeft: 15
        }}
        textProps={{ letterSpacing: 5, fontSize: 12 }}
        isActiveInput={isActive}
        size={43}
      />
      {isActive && (
        <ExpandedInfo
          receiverStatus={true}
          receiverInput={inputName}
          tvStatus={true}
          activeRemote={inputName}
          containerProps={{
            paddingLeft: 15
          }}
        />
      )}
    </View>
  )
}

export default PresetInfo
