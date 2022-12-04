import AuthHeader from "./auth.header"
import pmServer from "src/api/pmServer"

const GetUser = async ( id: string ) => {
  const response = await pmServer.get(`pm/user?id=${id}`, { headers: AuthHeader() })
  if ( response.data ) {
    localStorage.setItem( "user", JSON.stringify( response.data ) )
  }
  return response.data
}

const SearchUsers = async ( searchString: string ) => {
  const response = await pmServer.get(`pm/search-users?searchString=${searchString}`, { headers: AuthHeader() })
  return response.data
}
const UserService = {
  GetUser,
  SearchUsers
}
export default UserService