/* do not change this file, it is auto generated by storybook. */

import {
  configure,
  addDecorator,
  addParameters,
  addArgsEnhancer
} from "@storybook/react-native"

import "@storybook/addon-ondevice-notes/register"
import "@storybook/addon-ondevice-controls/register"
import "@storybook/addon-ondevice-backgrounds/register"
import "@storybook/addon-ondevice-actions/register"

import { argsEnhancers } from "@storybook/addon-actions/dist/modern/preset/addArgs"

import { decorators, parameters } from "./preview"

if (decorators) {
  decorators.forEach(decorator => addDecorator(decorator))
}

if (parameters) {
  addParameters(parameters)
}

// temporary fix for https://github.com/storybookjs/react-native/issues/327 whilst the issue is investigated
try {
  argsEnhancers.forEach(enhancer => addArgsEnhancer(enhancer))
} catch {}

const getStories = () => {
  return [
    require("../components/ui/atoms/Button.stories.tsx"),
    require("../components/ui/preset/atoms/ExpandedInfo.stories.tsx"),
    require("../components/ui/preset/molecules/Preset.stories.tsx"),
    require("../components/ui/preset/molecules/PresetInfo.stories.tsx"),
    require("../components/ui/remote/atoms/DPadArrow.stories.tsx"),
    require("../components/ui/remote/atoms/DPadSelect.stories.tsx"),
    require("../components/ui/remote/atoms/VolumeSlider.stories.tsx"),
    require("../components/ui/remote/molecules/DPad.stories.tsx"),
    require("../components/ui/remote/molecules/Remote.stories.tsx"),
    require("../components/ui/category/molecules/Category.stories.tsx")
  ]
}

configure(getStories, module, false)
