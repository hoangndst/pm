import * as React from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useInBox } from 'src/contexts/InboxContext';
import SearchUser from 'src/components/Inbox/SearchUser';

export default function ChatSpaceIndex() {
  
  const { setSelectedConversation } = useInBox()

  React.useEffect(() => {
    setSelectedConversation(null)
  }, [])

  return (
    <Box
      sx={{ height: 'calc(100vh - 150px)', width: '100%' }}
    >
      {/* <Box
        sx={{ flexGrow: 1, overflow: "auto", height: '100%', width: '100%', p: 1 }}
      >  */}
        <SearchUser />
        <Typography variant='body1' sx={{ textAlign: 'center', mt: 5 }}>
          Select a conversation to start messaging
        </Typography>
      {/* </Box> */}
    </Box >
  );
}