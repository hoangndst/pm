import { createCtx } from "./CreateCtx"
import React from "react"
import { io } from "socket.io-client"

interface InBoxContextType {
  conversations: any[]
  setConversations: React.Dispatch<React.SetStateAction<any[]>>,
  selectedConversation: any
  setSelectedConversation: React.Dispatch<React.SetStateAction<any>>,
  messages: any[]
  setMessages: React.Dispatch<React.SetStateAction<any[]>>,
  socket: any
}

export const [useInBox, InBoxProvider] = createCtx<InBoxContextType>()

export default function InboxContext({ children }: { children: React.ReactNode }) {
  const [conversations, setConversations] = React.useState<any[]>([])
  const [selectedConversation, setSelectedConversation] = React.useState<any>(conversations[0])
  const [messages, setMessages] = React.useState<any[]>([])
  const socket = React.useRef(io("http://localhost:5000", { transports: ["websocket"], withCredentials: true })) 
  return (
    <InBoxProvider value={{ conversations, setConversations, selectedConversation, setSelectedConversation, messages, setMessages, socket }}>
      {children}
    </InBoxProvider>
  )
}