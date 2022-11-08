import React from "react"
import { View } from "react-native"
import Device, { DeviceProps } from "../atoms/Device"

interface DevicesProps {
  readonly deviceList: ReadonlyArray<DeviceProps>
}

const Devices = ({ deviceList }: DevicesProps) => {
  return (
    <View>
      {deviceList.map(device => {
        return <Device name={device.name} />
      })}
    </View>
  )
}

export default Devices
