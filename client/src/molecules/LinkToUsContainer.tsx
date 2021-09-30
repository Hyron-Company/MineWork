import { Box } from '@mui/system'
import React from 'react'
import { AuthGoogleButton } from '../atoms/AuthGoogleButton'
import { AppleLink } from './AppleLink'
import { FacebookLink } from './FacebookLink'

export const LinkToUsContainer = () => {
  return (
    <Box className="link-to-us-container" display="flex">
      <AuthGoogleButton />
      <FacebookLink />
      <AppleLink />
    </Box>
  )
}
