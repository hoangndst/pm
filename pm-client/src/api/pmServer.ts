import axios from "axios"

const pmServer = axios.create({
  baseURL: "http://192.168.43.101:5000",
  headers: {
    "Content-Type": "application/json",
  }
})
export default pmServer