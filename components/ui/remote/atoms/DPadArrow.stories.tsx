import React from "react"
import { ComponentMeta, ComponentStory } from "@storybook/react"

import { DPadArrow } from "./DPadArrow"

export default {
  title: "remote/atoms/DPadArrow",
  component: DPadArrow,
  parameters: {
    layout: "centered"
  },
  argTypes: {
    rotation: {
      options: ["right", "left", "up", "down"],
      control: { type: "radio" }
    }
  }
} as ComponentMeta<typeof DPadArrow>

export const Default: ComponentStory<typeof DPadArrow> = args => (
  <DPadArrow {...args} />
)

Default.args = {
  rotation: "right",
  length: 50,
  styleProps: {
    borderBottomColor: "gray",
    position: "relative",
    top: 150,
    left: 150
  }
}
