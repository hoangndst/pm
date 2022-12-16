import { createCtx } from "./CreateCtx"
import React from "react"
import { io } from "socket.io-client"
import { useLocation } from "react-router-dom"
import { useAppSelector } from "src/app/hook"
import InboxService from "src/services/inbox.service"

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
  const location = useLocation()
  const { user } = useAppSelector((state: { user: any }) => state.user)
  const [conversations, setConversations] = React.useState<any[]>([])
  const [selectedConversation, setSelectedConversation] = React.useState<any>(conversations[0])
  const [messages, setMessages] = React.useState<any[]>([])
  const socket = React.useRef(io("http://localhost:5000", { transports: ["websocket"], withCredentials: true }))
  React.useEffect(() => {
    InboxService.GetConversationsById(user.id)
      .then((response) => {
        setConversations(response.conversations)
        console.log('get conversations', response.conversations)
        const re = /\/inbox\/\d+/
        if (re.test(location.pathname)) {
          const conversationId = location.pathname.split("/")[2]
          const conversation = response.conversations.find((conversation: any) => conversation.id === conversationId)
          setSelectedConversation(conversation)
          InboxService.GetMessagesByConversationId(conversationId)
            .then((response) => {
              setMessages(response)
            })
            .catch((err) => {
              console.log(err)
            })
          const userInfo = {
            id: user.id,
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name
          }
          socket.current.emit("join", { userInfo: userInfo, conversationId: conversationId }, (error: any) => {
            if (error) {
              alert(error);
            }
          })
        } else {
          setSelectedConversation(response.conversations[0])
          InboxService.GetMessagesByConversationId(response.conversations[0].id)
            .then((response) => {
              setMessages(response)
            })
            .catch((err) => {
              console.log(err)
            })
          const userInfo = {
            id: user.id,
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name
          }
          socket.current.emit("join", { userInfo: userInfo, conversationId: response.conversations[0].id }, (error: any) => {
            if (error) {
              alert(error);
            }
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <InBoxProvider value={{ conversations, setConversations, selectedConversation, setSelectedConversation, messages, setMessages, socket }}>
      {children}
    </InBoxProvider>
  )
}