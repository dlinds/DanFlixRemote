import React, { useState, useEffect } from "react"
import { ComponentMeta, ComponentStory } from "@storybook/react"

import Category from "./Category"
import { View } from "react-native"

export default {
  title: "Category/molecules/Category",
  component: Category,
  parameters: {
    layout: "padded"
  }
} as ComponentMeta<typeof Category>

export const Basic: ComponentStory<typeof Category> = args => {
  return (
    <View
      style={{
        padding: "1%",
        display: "flex",
        height: "100%",
        width: "50%",
        flex: 1
      }}
    >
      <Category categoryList={args.inputList} />
    </View>
  )
}

const seedInputs = [
  {
    isActive: true,
    inputName: "Presets"
  },
  {
    isActive: false,
    inputName: "Devices"
  },
  {
    isActive: false,
    inputName: "Suggestions"
  }
]

Basic.args = {
  inputList: [...seedInputs]
}
