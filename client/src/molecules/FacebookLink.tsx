import React from 'react'
import { NavLink } from '../atoms/NavLink'
import { FacebookSvg } from '../svg/FacebookSvg'

interface FacebookLinkProps {
  className?: string
}

export const FacebookLink: React.FC<FacebookLinkProps> = ({ className }) => {
  return <NavLink href="https://www.facebook.com/" className={`link-to-us ${className}`} children={<FacebookSvg />} />
}
