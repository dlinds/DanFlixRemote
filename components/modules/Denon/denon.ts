const XMLParser = require("react-xml-parser")

type Command = "PW" | "ZM" | "MV"
type XMLPath = "AppCommand.xml" | "formiPhoneAppDirect.xml"
type Parameter = "ON" | "OFF" | "UP" | "DOWN" | number

const url = "http://192.168.0.55:8080/goform/"

export const denonSendCommand = (command: Command, parameter: Parameter) => {
  const xmlPath: XMLPath = "formiPhoneAppDirect.xml"
  const urlStr = `${url}${xmlPath}?${command}${parameter}`
  fetch(urlStr)
    .then(res => res.toString())
    .then(resStr => console.log(resStr))
}

export const powerStatus = async () => {
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
    .then(result => result)
    .catch(error => console.log("error", error))
  const extractedStatus =
    response && response.toString().match("<zone1>(.*)</zone1>")
  const status = extractedStatus && extractedStatus[1]
  console.log(status)
  return status === "ON" ? true : false
}

export const volumeStatus = () => {
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
    .catch(error => console.log("error", error))

  return response
}
