import axios from "axios"

const pmAuthorization = axios.create({
  baseURL: "http://192.168.1.9:5001",
  headers: {
    "Content-Type": "application/json",
  }
})
export default pmAuthorization