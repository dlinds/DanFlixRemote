import React from "react"
import { ComponentMeta, ComponentStory } from "@storybook/react"

import Remote from "./Remote"
import { View } from "react-native"

export default {
  title: "remote/screens/Remote",
  component: Remote,
  argTypes: {
    screenWidth: {
      control: { type: "number" }
    }
  }
} as ComponentMeta<typeof Remote>

export const Default: ComponentStory<typeof Remote> = (args: any) => (
  <View
    style={{
      display: "flex",
      paddingVertical: "2%",
      alignItems: "center",
      justifyContent: "center",
      height: "100%"
    }}
  >
    <View
      style={{
        width: `${args.screenWidth}%`
      }}
    >
      <Remote />
    </View>
  </View>
)

Default.args = {
  screenWidth: 50
}
