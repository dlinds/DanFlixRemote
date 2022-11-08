import { useEffect } from "react"
import React, { useState } from "react"
import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import { useAppSelector } from "../../../modules/hooks"
import Button from "../../atoms/Button"
import PresetInfo from "./PresetInfo"

export interface PresetProps {
  readonly inputList: ReadonlyArray<{
    isActive: boolean
    inputName: string
  }>
}

interface InputTranslator {
  [key: string]: string
}

const inputTranslator: InputTranslator = {
  MPLAY: "DanFlix",
  GAME: "Nintendo Switch",
  BD: "Chromecast"
}

const Preset = ({ inputList }: PresetProps) => {
  const [inputListItems, setInputListItems] = useState(inputList)

  const currentInput: string = useAppSelector(
    (state: any) => state.denonInput.currentInput
  )

  const handleSelectPreset = (inputName: string) => {
    setInputListItems(prev =>
      prev.map(input =>
        input.inputName.toUpperCase() === inputName.toUpperCase()
          ? {
              ...input,
              isActive: true
            }
          : { ...input, isActive: false }
      )
    )
  }

  useEffect(() => {
    handleSelectPreset(inputTranslator[currentInput])
  }, [currentInput])

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
