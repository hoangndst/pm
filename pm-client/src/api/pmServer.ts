import axios from "axios"

const pmServer = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  }
})
export default pmServer