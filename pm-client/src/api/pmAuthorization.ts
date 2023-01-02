import axios from "axios"
// env

const pmAuthorization = axios.create({
  baseURL: "http://pm.hoangndst.freeddns.org",
  headers: {
    "Content-Type": "application/json",
  }
})
export default pmAuthorization
