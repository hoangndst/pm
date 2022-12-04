import axios from "axios"

const pmAuthorization = axios.create({
  baseURL: "http://localhost:5001",
  headers: {
    "Content-Type": "application/json",
  }
})
export default pmAuthorization