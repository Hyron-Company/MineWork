import { Button } from '@mui/material'
import React from 'react'
import { LogoSvg } from '../svg/LogoSvg'
import { A } from '../atoms/A'

export const Logo: React.FC = () => {
  return (
    <A href="/" className="logo">
      <Button>
        <LogoSvg className="logo__icon" />
      </Button>
      <span className="logo__mine">Mine</span>
      <Button className="logo__work">Work</Button>
    </A>
  )
}
