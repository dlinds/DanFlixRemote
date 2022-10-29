import React from "react"
import { ComponentMeta, ComponentStory } from "@storybook/react"

import { VolumeSlider } from "./VolumeSlider"

export default {
  title: "remote/atoms/VolumeSlider",
  component: VolumeSlider,
  parameters: {
    layout: "centered"
  }
} as ComponentMeta<typeof VolumeSlider>

export const Default: ComponentStory<typeof VolumeSlider> = args => (
  <VolumeSlider {...args} />
)

Default.args = {}
