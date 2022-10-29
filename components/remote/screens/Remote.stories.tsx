import React from "react"
import { ComponentMeta, ComponentStory } from "@storybook/react"

import Remote from "./Remote"

export default {
  title: "remote/screens/Remote",
  component: Remote
} as ComponentMeta<typeof Remote>

export const Default: ComponentStory<typeof Remote> = () => <Remote />

Default.args = {}
