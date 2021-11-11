import { IconButton, Avatar, Typography } from '@mui/material'

export const SidebarUser: React.FC = () => {
  return (
    <div className="sidebar-user">
      <IconButton className="p0">
        <Avatar sx={{ width: 60, height: 60 }} />
      </IconButton>
      <Typography variant="subtitle1">Александр Николев</Typography>
      <Typography variant="caption">Nagibator777</Typography>
    </div>
  )
}