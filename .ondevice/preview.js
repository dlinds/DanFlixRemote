import { withBackgrounds } from "@storybook/addon-ondevice-backgrounds"
export const decorators = [withBackgrounds]
export const parameters = {
  backgrounds: [
    { name: "dark", value: "#0A100D", default: true },
    { name: "light", value: "#fff" }
  ]
}
