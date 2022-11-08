import React from "react"
import { View } from "react-native"

export interface DeviceProps {
  readonly name: string
}

const Device = ({ name }: DeviceProps) => {
  return <View>{name}</View>
}

export default Device
