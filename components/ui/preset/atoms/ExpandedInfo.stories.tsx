import React from "react"
import { ComponentMeta, ComponentStory } from "@storybook/react"

import ExpandedInfo from "./ExpandedInfo"
import { View } from "react-native"

export default {
  title: "preset/atoms/ExpandedInfo",
  component: ExpandedInfo,
  parameters: {
    layout: "padded"
  }
} as ComponentMeta<typeof ExpandedInfo>

export const Basic: ComponentStory<typeof ExpandedInfo> = args => (
  <View style={{ padding: "10%" }}>
    <ExpandedInfo
      receiverStatus={true}
      receiverInput="DanFlix"
      activeRemote="DanFlix"
    />
  </View>
)

Basic.args = {}
