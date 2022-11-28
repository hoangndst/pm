import * as React from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { TextField, IconButton, Stack, Avatar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { getMessages2 } from 'src/libs/data';

interface Props {
  window?: () => Window;
  children?: React.ReactElement;
}


export default function ChatSpace(props: Props) {

  const [message, setMessage] = React.useState('')
  const data = getMessages2()

  return (
    <Box
      sx={{ height: 'calc(100vh - 150px)', width: '100%' }}
    >
      <Box
        sx={{ flexGrow: 1, overflow: "auto", height: '97%', width: '100%', p: 1 }}
      >
        <Stack direction='column' sx={{ justifyContent: 'center' }} spacing={0}>
          {data.messages.map((item, index) => (
            <Stack direction='row' 
              sx={{ justifyContent: 'flex-start', mt: index === 0 || data.messages[index - 1].fromUser.id === item.fromUser.id ? 0 : 1.5 }}
              key={`${item.fromUser.id} ${index}`}
            >
              
              <Avatar 
                sx={{ 
                  width: 40, height: 40, 
                  visibility: index === 0 || data.messages[index - 1].fromUser.id !== item.fromUser.id ? 'visible' : 'hidden' 
                }} 
                alt={item.fromUser.lastName} src="/static/images/avatar/1.jpg"
              />
              <Typography variant='body1' sx={{ ml: 1, mr: 1, mt: 0.5, mb: 0.5, p: 1, borderRadius: 1, backgroundColor: 'primary.light' }}>
                {item.messageContent}
              </Typography>
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
          maxRows={1}
          multiline
          size='small'
        />
        <IconButton
          sx={{ ml: 1 }}
          aria-label="send"
        >
          {message ? <SendIcon /> : <ThumbUpIcon />}
        </IconButton>
      </Box>
     
    
    </Box >
  );
}