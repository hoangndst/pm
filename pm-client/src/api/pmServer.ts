import axios from "axios"

const pmServer = axios.create({
  baseURL: "http://pm.hoangndst.freeddns.org",
  headers: {
    "Content-Type": "application/json",
  }
})
export default pmServer
