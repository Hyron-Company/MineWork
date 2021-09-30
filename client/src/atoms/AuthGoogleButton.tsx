import React from 'react'
import { GoogleSvg } from '../svg/GoogleSvg'
import { NavLink } from './NavLink'

interface AuthGoogleProps {
  className?: string
}

export const AuthGoogleButton: React.FC<AuthGoogleProps> = ({ className }) => {
  return (
    <NavLink
      href="https://www.google.com/"
      className={`link-to-us google-link ${className}`}
      text={'Войти с помощю google'}
      children={<GoogleSvg />}
    />
  )
}
