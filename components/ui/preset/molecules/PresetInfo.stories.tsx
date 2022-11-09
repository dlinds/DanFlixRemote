import React from "react"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import PresetInfo from "./PresetInfo"
import { View } from "react-native"

export default {
  title: "preset/molecules/PresetInfo",
  component: PresetInfo,
  parameters: {
    layout: "padded"
  },
  argTypes: {
    isActive: {
      options: [true, false],
      control: { type: "radio" }
    },
    inputName: {
      options: ["DanFlix"],
      control: { type: "text" }
    }
  }
} as ComponentMeta<typeof PresetInfo>

export const Basic: ComponentStory<typeof PresetInfo> = args => (
  <View style={{ padding: "10%" }}>
    <PresetInfo {...args} />
  </View>
)

Basic.args = {
  preset: { id: 0, isActive: true, nickname: "DanFlix", receiverInput: "MPLAY" }
}
