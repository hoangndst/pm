import * as React from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { TextField, IconButton, Stack, Avatar, Tooltip } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { useInBox } from 'src/contexts/InboxContext';
import { format } from 'date-fns'
import { useAppContext } from 'src/contexts/AppContext';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from 'src/app/hook';

interface Props {
  window?: () => Window;
  children?: React.ReactElement;
}


export default function ChatSpace(props: Props) {

  const [message, setMessage] = React.useState('')
  const { socket, messages, setMessages, selectedConversation } = useInBox()
  const [arrivedMessage, setArrivedMessage] = React.useState<any>(null)
  const scrollRef = React.useRef<any>()
  const { setOpenSnackbar, setSnackbarMessage, setSnackbarSeverity } = useAppContext()
  const location = useLocation()
  const { user } = useAppSelector((state: { user: any }) => state.user)

  React.useEffect(() => {
    socket.current.on('message', (message: any) => {
      console.log('new message', message)
      setArrivedMessage(message)
    })
  }, [location.pathname, socket])

  React.useEffect(() => {
    if (arrivedMessage) {
      console.log('arrivedMessage changed')
      console.log(arrivedMessage)
      const re = /\/inbox\/\d+/
      if (re.test(location.pathname)) {
        const conversationId = location.pathname.split('/')[2]
        if (arrivedMessage.conversation_id === conversationId) {
          setMessages((prevMessages: any) => [...prevMessages, arrivedMessage])
        } else {
          console.log(false)
        }
      }
    }
  }, [arrivedMessage, location.pathname, setMessages])

  const handleSendMessage = (e: any) => {
    e.preventDefault()
    if (message) {
      const userInfo = {
        id: user.id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name
      }
      socket.current.emit('sendMessage',
        {
          messageContent: message,
          conversationId: selectedConversation.id,
          userInfo: userInfo
        }, (error: any) => {
          if (error) {
            console.log(error)
          }
        })
      setMessage('')
    } else {
      setOpenSnackbar(true)
      setSnackbarMessage('Message cannot be empty')
      setSnackbarSeverity('error')
    }
  }

  React.useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <Box
      sx={{ height: 'calc(100vh - 150px)', width: '100%' }}
    >
      <Box
        sx={{ flexGrow: 1, overflow: "auto", height: '94%', width: '100%', p: 1 }}
      >
        <Stack direction='column' sx={{ justifyContent: 'center' }} spacing={0}>
          {messages.map((item, index) => (
            <Stack direction='row'
              sx={{ justifyContent: 'flex-start', mt: index === 0 || messages[index - 1].user.id === item.user.id ? 0 : 1.5 }}
              key={`${item.user.id}-${index}`}
              ref={scrollRef}
            >
              <Avatar
                sx={{
                  width: 40, height: 40,
                  visibility: index === 0 || messages[index - 1].user.id !== item.user.id ? 'visible' : 'hidden'
                }}
                alt={item.user.last_name} src={`https://github.com/identicons/${item.user.username}.png`}
              />
              <Stack direction='column' sx={{ justifyContent: 'center', ml: 1 }}>
                {index === 0 || messages[index - 1].user.id !== item.user.id ? (
                  <Typography variant='body2' sx={{ fontWeight: 600, fontSize: 14 }}>
                    {item.user.first_name} {item.user.last_name}
                  </Typography>

                ) : null}
                <Tooltip title={format(new Date(item.createdAt), 'PPPPpp')} placement='left-start'>
                  <Typography variant='body1' sx={{ ml: 1, mr: 1, mt: 0.5, mb: 0.5, p: 1, borderRadius: 1, backgroundColor: 'primary.light' }}>
                    {item.message_content}
                  </Typography>
                </Tooltip>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Box>
      <Box
        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingButtom: '5px' }}
      >
        <TextField
          id="chat-input"
          variant="outlined"
          fullWidth
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={2}
          multiline
          size='small'
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              handleSendMessage(e)
            }
          }}
        />
        <IconButton
          sx={{ ml: 1 }}
          aria-label="send"
          onClick={(e) => handleSendMessage(e)}
        >
          {message ? <SendIcon /> : <ThumbUpIcon />}
        </IconButton>
      </Box>
    </Box >
  );
}