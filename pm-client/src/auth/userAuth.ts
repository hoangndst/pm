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
  try {
    const response = await AuthService.SignIn( username, password )
    return response
  } catch ( error: any | AxiosError ) {
    if ( error.response ) {
      thunkAPI.dispatch( setMessage( error.response.data.message ) )
    } else {
      thunkAPI.dispatch( setMessage( error.message ) )
    }
    return thunkAPI.rejectWithValue( error.response.data.message )
  }
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
  SignUpRequest,
  {
    rejectValue: string
  }
>('auth/signup', async ( { username, email, password }, thunkAPI ) => {
  try {
    const response = await AuthService.SignUp( username, email, password )
    return response
  } catch ( error: any | AxiosError ) {
    if ( error.response ) {
      thunkAPI.dispatch( setMessage( error.response.data.message ) )
    } else {
      thunkAPI.dispatch( setMessage( error.message ) )
    }
    return thunkAPI.rejectWithValue( error.response.data.message )
  }
})

export const SignOut = createAsyncThunk(
  "auth/signout",
  async() => {
    AuthService.SignOut()
  }
)

const userAuth = JSON.parse( localStorage.getItem( "userAuth" ) as string )

const initialState = userAuth === null ? { isLoggedIn: false, userAuth: null } : { isLoggedIn: true, userAuth: userAuth }

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(SignUp.fulfilled, (state, action) => {
      state.isLoggedIn = false
      state.userAuth = null
    })
    builder.addCase(SignUp.rejected, (state, action) => {
      state.isLoggedIn = false
      state.userAuth = null
    })
    builder.addCase(SignIn.fulfilled, (state, action) => {
      state.isLoggedIn = true
      state.userAuth = action.payload
    })
    builder.addCase(SignIn.rejected, (state, action) => {
      state.isLoggedIn = false
      state.userAuth = null
    })
    builder.addCase(SignOut.fulfilled, (state, action) => {
      state.isLoggedIn = false
      state.userAuth = null
    })
  }
})

const { reducer } = authSlice
export default reducer
