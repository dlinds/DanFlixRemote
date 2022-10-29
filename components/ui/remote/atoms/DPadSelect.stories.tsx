import React from "react"
import { ComponentMeta, ComponentStory } from "@storybook/react"

import { DPadSelect } from "./DPadSelect"

export default {
  title: "remote/atoms/DPadSelect",
  component: DPadSelect,
  parameters: {
    layout: "centered"
  }
} as ComponentMeta<typeof DPadSelect>

export const Default: ComponentStory<typeof DPadSelect> = args => (
  <DPadSelect {...args} />
)

Default.args = {
  diameter: 100
}
