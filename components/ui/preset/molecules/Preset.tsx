import { useEffect } from "react"
import React, { useState } from "react"
import { View, TouchableOpacity } from "react-native"
import { useAppDispatch, useAppSelector } from "../../../modules/hooks"
import PresetInfo from "./PresetInfo"
import { useSendDenonCommandMutation } from "../../../modules/Denon/denon"
import { setInput } from "../../../modules/Denon/input"
import { db_inputList } from "../../../modules/database"
import { DenonParameters, SendCommandParam } from "../../../modules/interfaces"
import { useRokuSendKeyPressMutation } from "../../../modules/TCL/TCL"
import { setInitialPowerStatus } from "../../../modules/Denon/power"

interface PresetProps {
  readonly inputList: ReadonlyArray<{
    isActive: boolean
    inputName: string
  }>
}

const Preset = ({ inputList }: PresetProps) => {
  const [inputListItems, setInputListItems] = useState(db_inputList)
  const currentInput: DenonParameters = useAppSelector(
    (state: any) => state.denonInput.receiverInput
  )
  const currentPowerStatus: boolean = useAppSelector(
    (state: any) => state.denonPower.isPowered
  )

  const [sendCommand, result] = useSendDenonCommandMutation()
  const [sendRokuCommand, rokuResult] = useRokuSendKeyPressMutation()
  const dispatch = useAppDispatch()

  const updateInputItemState = (inputName: DenonParameters) => {
    setInputListItems(prev =>
      prev.map(input =>
        input.receiverInput !== inputName || !currentPowerStatus
          ? {
              ...input,
              isActive: false
            }
          : { ...input, isActive: true }
      )
    )
  }
  const handleSelectPreset = (inputName: DenonParameters) => {
    updateInputItemState(inputName)
    const powerOnParam: SendCommandParam = {
      command: "ZM",
      parameter: "ON"
    }
    const inputParam: SendCommandParam = {
      command: "SI",
      parameter: inputName
    }
    sendCommand(powerOnParam)
    sendRokuCommand("PowerOn")
    sendCommand(inputParam)
    dispatch(setInitialPowerStatus(!currentPowerStatus))
    dispatch(setInput(inputName))
    updateInputItemState(inputName)
  }

  useEffect(() => {
    updateInputItemState(currentInput)
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
