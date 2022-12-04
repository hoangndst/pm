import { createCtx } from "./CreateCtx"
import React from 'react'

interface UserType {
  id: string,
  username: string,
  email: string,
  first_name: string,
  last_name: string,
  birth_date?: string,
  avatar?: string,
}

interface UserContextType {
  user: UserType | null,
  setUser: React.Dispatch<React.SetStateAction<UserType>>
  }

export const [useUser, UserProvider] = createCtx<UserContextType>()

export default function UserContext({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState({ id: '', username: '', email: '', first_name: '', last_name: '' })
  return (
    <UserProvider value={{ user, setUser }}>
      {children}
    </UserProvider>
  )
}