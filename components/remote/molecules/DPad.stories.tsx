import React from "react"
import { ComponentMeta, ComponentStory } from "@storybook/react"

import { DPad } from "./DPad"

export default {
  title: "remote/molecules/DPad",
  component: DPad,
  parameters: {
    layout: "centered"
  }
} as ComponentMeta<typeof DPad>

export const Default: ComponentStory<typeof DPad> = args => <DPad {...args} />

Default.args = { diameter: 200 }
