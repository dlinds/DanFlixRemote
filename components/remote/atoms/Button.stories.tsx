import React from "react"
import { ComponentMeta, ComponentStory } from "@storybook/react"

import Button from "./Button"

export default {
  title: "remote/atoms/Button",
  component: Button,
  parameters: {
    layout: "padded"
  }
} as ComponentMeta<typeof Button>

export const Basic: ComponentStory<typeof Button> = args => <Button {...args} />

Basic.args = {
  variant: "standard",
  title: "Test",
  isActiveInput: false,
  onPress: () => console.log("clicked")
}
export const Icon: ComponentStory<typeof Button> = args => <Button {...args} />

Icon.args = {
  variant: "icon",
  title: "heart"
}
