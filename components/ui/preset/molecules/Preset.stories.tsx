import React, { useState, useEffect } from "react"
import { ComponentMeta, ComponentStory } from "@storybook/react"

import Preset from "./Preset"
import { View } from "react-native"

export default {
  title: "preset/molecules/Preset",
  component: Preset,
  parameters: {
    layout: "padded"
  }
} as ComponentMeta<typeof Preset>

export const Basic: ComponentStory<typeof Preset> = args => {
  return (
    <View
      style={{ padding: "1%", display: "flex", height: "50%", width: "50%" }}
    >
      <Preset inputList={args.inputList} />
    </View>
  )
}

export const seedInputs = [
  {
    isActive: false,
    inputName: "DanFlix"
  },
  {
    isActive: false,
    inputName: "Chromecast"
  },
  {
    isActive: false,
    inputName: "Nintendo Switch"
  },
  {
    isActive: true,
    inputName: "Netflix"
  },
  {
    isActive: false,
    inputName: "YouTube"
  }
]

Basic.args = {
  inputList: [...seedInputs]
}
