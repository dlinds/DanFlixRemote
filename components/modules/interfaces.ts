export interface ReceiverInput {
  readonly id: number
  readonly receiverInput: DenonParameters
  readonly nickname: string
  isActive: boolean
}
export type DenonCommands = "PW" | "ZM" | "MV" | "SI"
export type DenonParameters =
  | "ON"
  | "STANDBY"
  | "UP"
  | "DOWN"
  | "MPLAY"
  | "GAME"
  | "BD"
  | "DVD"
  | number

export interface SendCommandParam {
  command: DenonCommands
  parameter: DenonParameters
}

export type RokuKeyPresses = "PowerOn" | "PowerOff" | "Home"
