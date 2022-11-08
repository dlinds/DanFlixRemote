import { useEffect } from "react"
import React, { useState } from "react"
import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import { useAppDispatch, useAppSelector } from "../../../modules/hooks"
import Button from "../../atoms/Button"
import PresetInfo from "./PresetInfo"
import { setInitialPowerStatus } from "../../../modules/Denon/power"
import {
  useSendCommandMutation,
  SendCommandParam,
  DenonParameters
} from "../../../modules/store"
import { setInput } from "../../../modules/Denon/input"

export interface PresetProps {
  readonly inputList: ReadonlyArray<{
    isActive: boolean
    inputName: string
  }>
}

interface InputTranslator {
  [key: string]: DenonParameters
}

const inputTranslator: InputTranslator = {
  DanFlix: "MPLAY",
  "Nintendo Switch": "GAME",
  Chromecast: "BD"
}

const Preset = ({ inputList }: PresetProps) => {
  const [inputListItems, setInputListItems] = useState(inputList)

  const currentInput: string = useAppSelector(
    (state: any) => state.denonInput.currentInput
  )
  const [sendCommand, result] = useSendCommandMutation()
  const dispatch = useAppDispatch()

  const updateInputItems = (inputName: string) => {
    setInputListItems(prev =>
      prev.map(input =>
        inputTranslator[input.inputName] === inputName
          ? {
              ...input,
              isActive: true
            }
          : { ...input, isActive: false }
      )
    )
  }
  const handleSelectPreset = (inputName: string) => {
    updateInputItems(inputName)
    const inputParam: SendCommandParam = {
      command: "SI",
      parameter: inputTranslator[inputName]
    }
    sendCommand(inputParam)
    dispatch(setInput(inputName))
  }

  useEffect(() => {
    updateInputItems(currentInput)
  }, [])

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
