import { RateLimiter } from "limiter"

export const XMLParser = require("react-xml-parser")

type Command = "PW" | "ZM" | "MV" | "SI"
type XMLPath = "AppCommand.xml" | "formiPhoneAppDirect.xml"
type Parameter = "ON" | "STANDBY" | "UP" | "DOWN" | number
type Method = "SEND" | "STATUS"

export const url = "http://192.168.0.55:8080/goform/"

const limiter = new RateLimiter({ tokensPerInterval: 1, interval: 500 })

export const callDenon = async (
  type: Method,
  command: Command,
  parameter?: Parameter
) => {
  const remainingMessages = await limiter.removeTokens(1)

  if (type === "SEND" && parameter) {
    return await sendCommand(command, parameter)
  }

  if (type === "STATUS") {
    return command === "MV" ? await statusVolume() : await statusPower()
  }
}

const sendCommand = async (command: Command, parameter: Parameter) => {
  const xmlPath: XMLPath = "formiPhoneAppDirect.xml"
  const urlStr = `${url}${xmlPath}?${command}${parameter}`
  await fetch(urlStr)
    .then(res => res.toString())
    .catch(res => console.log("Denon send command: ", res))
}

const statusPower = async () => {
  const myHeaders = new Headers()
  myHeaders.append("Content-Type", "text/plain")

  const raw =
    '<?xml version="1.0" encoding="utf-8"?>\r\n<tx>\r\n  <cmd id="1">GetAllZonePowerStatus</cmd>\r\n</tx>'

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  }

  const xmlPath: XMLPath = "AppCommand.xml"

  const response = await fetch(`${url}${xmlPath}`, requestOptions)
    .then(response => response.text())
    .catch(error => console.log("get power status error", error))
  const extractedStatus =
    response && response.toString().match("<zone1>(.*)</zone1>")
  const status = extractedStatus && extractedStatus[1]
  console.log(status)
  return status === "ON" ? true : false
}

const statusVolume = () => {
  const myHeaders = new Headers()
  myHeaders.append("Content-Type", "text/plain")

  const raw =
    '<?xml version="1.0" encoding="utf-8"?>\r\n<tx>\r\n  <cmd id="1">GetAllZoneVolume</cmd>\r\n</tx>'

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  }

  const xmlPath: XMLPath = "AppCommand.xml"

  const response = fetch(`${url}${xmlPath}`, requestOptions)
    .then(res => res.text())
    .then(data => {
      const xml = new XMLParser().parseFromString(data)
      return xml.children[0].children[0].children[4].value
    })
    .catch(error => console.log("get volume error", error))

  return response
}

const statusAll = () => {
  const myHeaders = new Headers()
  myHeaders.append("Content-Type", "text/plain")

  const raw =
    '<?xml version="1.0" encoding="utf-8"?>\r\n<tx>\r\n  <cmd id="1">GetAllZonePowerStatus</cmd>\r\n   <cmd id="1">GetVolumeLevel</cmd>\r\n   <cmd id="1">GetSourceStatus</cmd>\r\n</tx>'

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  }

  const xmlPath: XMLPath = "AppCommand.xml"

  const response = fetch(`${url}${xmlPath}`, requestOptions)
    .then(res => res.text())
    .then(data => {
      const xml = new XMLParser().parseFromString(data)
      console.log(xml)
    })
    .catch(error => console.log("get volume error", error))

  return response
}
