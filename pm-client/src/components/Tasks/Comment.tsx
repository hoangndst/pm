import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Badge from '@mui/material/Badge'
import { useTheme } from '@mui/material/styles'
import LikeIcon from 'src/modules/components/Like'

export default function Comment({ comment }: { comment: any }) {
  const theme = useTheme()
  return (
    <Stack
      direction='row'
      spacing={1}
      sx={{
        alignItems: 'center',
      }}
    >
      <Avatar
        alt={comment.user.lastName}
        src={`https://github.com/identicons/${comment.user.username}.png`}
        sx={{ width: 32, height: 32, }}
      />
      <Stack direction='column' sx={{ justifyContent: 'center', ml: 0 }}>
        <Typography variant='body2' sx={{ fontWeight: 600, fontSize: 14 }}>
          {comment.user.firstName} {comment.user.lastName}
        </Typography>
        <Badge 
          badgeContent={
            <Stack 
              direction='row' spacing={0.5} 
              sx={{ justifyContent: 'flex-start', alignItems: 'center' }}
            >
              {/* <ThumbUpIcon 
                sx={{
                  color: comment.commentReaction ? comment.commentReaction.reactionCount > 0 ? 'primary' : 'default' : 'default',
                  width: 12,
                }} 
              /> */}
              <LikeIcon />
              <Typography variant='body2' sx={{ fontSize: 12 }}>
                {comment.commentReaction ? comment.commentReaction.reactionCount : 0}
              </Typography>
            </Stack>
          }
          color={comment.commentReaction ? comment.commentReaction.reactionCount > 0 ? 'primary' : 'default' : 'default'}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
          <Typography variant='body1' sx={{ ml: 0, mr: 1, mt: 0.5, mb: 0.5, p: 1, borderRadius: 1, backgroundColor: theme.palette.mode === 'dark' ? 'primary.dark' : 'primary.light' }}>
            {comment.commentContent}
          </Typography>
        </Badge>
        <Stack direction='row' spacing={1} sx={{ justifyContent: 'flex-start', alignItems: 'center' }}>
          <Typography variant='body2' sx={{ fontSize: 12, color: 'text.secondary' }}>
            {comment.createdAt}
          </Typography>
          {/* <Badge badgeContent={comment.commentReaction? comment.commentReaction.reactionCount : 0} color='primary'>
            <ThumbUpIcon />
          </Badge> */}
        </Stack>
      </Stack>
    </Stack>
  )
}