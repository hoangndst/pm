import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import AuthService from "../services/auth.service"
import { AxiosError } from "axios"
import { setMessage } from "./messageSlice"

interface SignInRequest {
  username: string,
  password: string
}
interface SignInResponse {
  id: number,
  username: string,
  email: string,
  token: string
  refreshToken: string
}
export const SignIn = createAsyncThunk<
  SignInResponse,
  SignInRequest,
  {
    rejectValue: string
  }
>('auth/signin', async ( { username, password }, thunkAPI ) => {
  return AuthService.SignIn( username, password )
    .then(( response ) => {
      return response
    }).catch((error: any | AxiosError) => {
      if ( error.response ) {
        thunkAPI.dispatch( setMessage( error.response.data.message ) )
      } else {
        thunkAPI.dispatch( setMessage( error.message ) )
      }
      return thunkAPI.rejectWithValue( error.response.data.message )
    })

})

interface SignUpRequest {
  username: string,
  email: string,
  password: string
}
interface SignUpResponse {
  message: string
}
export const SignUp = createAsyncThunk<
  SignUpResponse,
  SignUpRequest
>('auth/signup', async ( { username, email, password }, thunkAPI ) => {
  return AuthService.SignUp( username, email, password )
    .then(( response ) => {
      return response
    }).catch((error: any | AxiosError) => {
      if ( error.response ) {
        thunkAPI.dispatch( setMessage( error.response.data.message ) )
      } else {
        thunkAPI.dispatch( setMessage( error.message ) )
      }
      return thunkAPI.rejectWithValue( error.response.data.message )
    })
})

export const SignOut = createAsyncThunk(
  "auth/signout",
  async() => {
    await AuthService.SignOut()
  }
)



const user = JSON.parse( localStorage.getItem( "user" ) as string )

const initialState = user === null ? { isLoggedIn: false, user: null } : { isLoggedIn: true, user: user }

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(SignUp.fulfilled, (state, action) => {
      state.isLoggedIn = false
      state.user = null
    })
    builder.addCase(SignUp.rejected, (state, action) => {
      state.isLoggedIn = false
      state.user = null
    })
    builder.addCase(SignIn.fulfilled, (state, action) => {
      state.isLoggedIn = true
      state.user = action.payload
    })
    builder.addCase(SignIn.rejected, (state, action) => {
      state.isLoggedIn = false
      state.user = null
    })
    builder.addCase(SignOut.fulfilled, (state, action) => {
      state.isLoggedIn = false
      state.user = null
    })
  }
})

const { reducer } = authSlice
export default reducer