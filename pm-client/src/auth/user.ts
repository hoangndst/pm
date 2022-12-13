import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import UserService from "src/services/user.service"
import { AxiosError } from "axios"
import { setMessage } from "./messageSlice"

interface GetUserRequest {
  id: string
}
interface GetUserResponse {
  id: string,
  username: string,
  email: string,
  first_name: string,
  last_name: string,
  birth_date?: string,
  avatar?: string,
  createdAt: string,
  updatedAt: string
}
export const GetUser = createAsyncThunk<
  GetUserResponse,
  GetUserRequest,
  {
    rejectValue: string
  }
>('user/getUser', async ( { id }, thunkAPI ) => {
  try {
    const response = await UserService.GetUser( id )
    return response as unknown as GetUserResponse
  } catch ( error: any | AxiosError ) {
    if ( error.response ) {
      thunkAPI.dispatch( setMessage( error.response.data.message ) )
    } else {
      thunkAPI.dispatch( setMessage( error.message ) )
    }
    return thunkAPI.rejectWithValue( error.response.data.message )
  }
})


const user = JSON.parse( localStorage.getItem( "user" ) as string )
const initialState = user === null ? {user: {}} : {user: user}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetUser.rejected, (state, action) => {
      state.user = null
    })
    builder.addCase(GetUser.fulfilled, (state, action) => {
      state.user = action.payload
    })
  }
})

const { reducer } = userSlice
export default reducer