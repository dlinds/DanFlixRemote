import { useEffect } from "react"
import React, { useState } from "react"
import { View, TouchableOpacity } from "react-native"
import { useAppDispatch, useAppSelector } from "../../../modules/hooks"
import PresetInfo from "./PresetInfo"
import { useSendCommandMutation } from "../../../modules/store"
import { setInput } from "../../../modules/Denon/input"
import { db_inputList } from "../../../modules/database"
import { DenonParameters, SendCommandParam } from "../../../modules/interfaces"

interface PresetProps {
  readonly inputList: ReadonlyArray<{
    isActive: boolean
    inputName: string
  }>
}

const Preset = ({ inputList }: PresetProps) => {
  const [inputListItems, setInputListItems] = useState(db_inputList)
  // console.log("input", inputListItems)
  const currentInput: DenonParameters = useAppSelector(
    (state: any) => state.denonInput.receiverInput
  )
  // console.log("???", currentInput)
  const [sendCommand, result] = useSendCommandMutation()
  const dispatch = useAppDispatch()

  const updateInputItemState = (inputName: DenonParameters) => {
    setInputListItems(prev =>
      prev.map(input =>
        input.receiverInput === inputName
          ? {
              ...input,
              isActive: true
            }
          : { ...input, isActive: false }
      )
    )
  }
  const handleSelectPreset = (inputName: DenonParameters) => {
    updateInputItemState(inputName)

    const inputParam: SendCommandParam = {
      command: "SI",
      parameter: inputName
    }
    sendCommand(inputParam)
    dispatch(setInput(inputName))
  }

  useEffect(() => {
    updateInputItemState(currentInput) //current input is BD, should rework the obj to have nickname and actual name
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
            onPress={() => handleSelectPreset(preset.receiverInput)}
            key={index}
          >
            <PresetInfo preset={preset} />
          </TouchableOpacity>
        ) : (
          <PresetInfo preset={preset} key={index} />
        )
      })}
    </View>
  )
}

export default Preset
