import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: '',
}

const messageSlice = createSlice( {
  name: 'message',
  initialState,
  reducers: {
    setMessage: ( state: any, action: { payload: any } ) => {
      return { message: action.payload }
    },
    clearMessage: ( state ) => {
      return { message: '' }
    },
  },
} )

const { reducer, actions } = messageSlice

export const { setMessage, clearMessage } = actions
export default reducer