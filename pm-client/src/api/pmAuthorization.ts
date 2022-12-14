import axios from "axios"

const pmAuthorization = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  }
})
export default pmAuthorization