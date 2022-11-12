import pmAuthorization from "../api/pmAuthorization"

const SignIn = async ( username: string, password: string ) => {
  return pmAuthorization.post( "/auth/signin", { username, password } )
    .then( response => {
      if ( response.data.accessToken ) {
        localStorage.setItem( "user", JSON.stringify( response.data ) )
      }
      return response.data
    })
}

const SignUp = async ( username: string, email: string, password: string ) => {
  return pmAuthorization.post( "/auth/signup", { username, email, password } )
    .then( response => {
      return response.data
    })
}

const SignOut = () => {
  localStorage.removeItem( "user" )
}

const AuthService = {
  SignIn,
  SignUp,
  SignOut
}

export default AuthService