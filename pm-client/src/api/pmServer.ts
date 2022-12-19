import axios from "axios"

const pmServer = axios.create({
  baseURL: "http://hoangndst.ddns.net:3000",
  headers: {
    "Content-Type": "application/json",
  }
})
export default pmServer
