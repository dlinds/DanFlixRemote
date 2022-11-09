import React from "react"
import { View, StyleSheet, Text } from "react-native"
import { useAppSelector } from "../../../modules/hooks"
import { ReceiverInput } from "../../../modules/interfaces"
import Button from "../../atoms/Button"
import ExpandedInfo from "../atoms/ExpandedInfo"

export interface PresetInfoProps {
  readonly preset: ReceiverInput
}

const PresetInfo = ({ preset }: PresetInfoProps) => {
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
  const currentPowerStatus: boolean = useAppSelector(
    (state: any) => state.denonPower.isPowered
  )
  return (
    <View style={styles.container}>
      <Button
        variant="standard"
        title={preset.nickname}
        containerProps={{
          alignItems: "flex-start",
          paddingLeft: 15
        }}
        childrenProps={{ letterSpacing: 5, fontSize: 12 }}
        isActiveInput={preset.isActive}
        size={43}
      />
      {preset.isActive && (
        <ExpandedInfo
          receiverStatus={currentPowerStatus}
          receiverInput={preset.nickname}
          tvStatus={true}
          activeRemote={preset.nickname}
          containerProps={{
            paddingLeft: 15
          }}
        />
      )}
    </View>
  )
}

export default PresetInfo
