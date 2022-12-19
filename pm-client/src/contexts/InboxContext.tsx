import { createCtx } from "./CreateCtx"
import React from "react"
import { useLocation } from "react-router-dom"
import { useAppSelector } from "src/app/hook"
import InboxService from "src/services/inbox.service"
import { useAppContext } from "./AppContext"

interface InBoxContextType {
  conversations: any[]
  setConversations: React.Dispatch<React.SetStateAction<any[]>>,
  selectedConversation: any
  setSelectedConversation: React.Dispatch<React.SetStateAction<any>>,
  messages: any[]
  setMessages: React.Dispatch<React.SetStateAction<any[]>>,
}

export const [useInBox, InBoxProvider] = createCtx<InBoxContextType>()

export default function InboxContext({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const { user } = useAppSelector((state: { user: any }) => state.user)
  const [conversations, setConversations] = React.useState<any[]>([])
  const [selectedConversation, setSelectedConversation] = React.useState<any>(conversations[0])
  const [messages, setMessages] = React.useState<any[]>([])
  const { socket } = useAppContext()

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
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  React.useEffect(() => {
    const re = /\/inbox\/\d+/
    if (selectedConversation) {
      socket.current.emit("leave", { conversationId: selectedConversation.id }, (error: any) => {
        if (error) {
          alert(error);
        } else {
          console.log('emit leave')
        }
      })
    }
    if (re.test(location.pathname)) {
      const conversationId = location.pathname.split("/")[2]
      conversations.forEach((conversation: any) => {
        if (conversation.id === conversationId) {
          setSelectedConversation(conversation)
        }
      })
      InboxService.GetMessagesByConversationId(conversationId)
        .then((response) => {
          setMessages(response)
          console.log(response)
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
        console.log('emit join', conversationId)
        if (error) {
          alert(error);
        }
      })
    }
  }, [location.pathname])

  return (
    <InBoxProvider value={{ conversations, setConversations, selectedConversation, setSelectedConversation, messages, setMessages }}>
      {children}
    </InBoxProvider>
  )
}