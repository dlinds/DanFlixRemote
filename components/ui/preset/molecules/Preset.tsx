import React, { useState } from "react"
import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import Button from "../../atoms/Button"
import PresetInfo from "./PresetInfo"

export interface PresetProps {
  readonly inputList: ReadonlyArray<{
    isActive: boolean
    inputName: string
  }>
}

const Preset = ({ inputList }: PresetProps) => {
  const [inputListItems, setInputListItems] = useState(inputList)

  const handleSelectPreset = (inputName: string) => {
    setInputListItems(prev =>
      prev.map(input =>
        input.inputName === inputName
          ? {
              ...input,
              isActive: true
            }
          : { ...input, isActive: false }
      )
    )
  }

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        width: "100%"
      }}
    >
      {inputListItems.map((preset, index) => {
        return !preset.isActive ? (
          <TouchableOpacity
            onPress={() => handleSelectPreset(preset.inputName)}
            key={index}
          >
            <PresetInfo {...preset} />
          </TouchableOpacity>
        ) : (
          <PresetInfo {...preset} key={index} />
        )
      })}
    </View>
  )
}

export default Preset
