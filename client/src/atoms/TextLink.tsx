import React from 'react'
import { NavLink } from './NavLink'

interface TextLinkProps {
  href: string
  textOne: string
  textTwo?: string
  className?: string
  position?: 'vertical' | 'horizontal'
}

export const TextLink: React.FC<TextLinkProps> = ({ href, className, textOne, textTwo, position = 'horizontal' }) => {
  return (
    <NavLink href={href} className={`text-link ${position} ${className}`}>
      <span className="text-link__text-one">{textOne}</span>
      <span className="text-link__text-two">{textTwo}</span>
    </NavLink>
  )
}
