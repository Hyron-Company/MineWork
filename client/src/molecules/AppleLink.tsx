import React from 'react'
import { AppleSvg } from '../svg/AppleSvg'
import { NavLink } from '../atoms/NavLink'

interface AppleLinkProps {
  className?: string
}

export const AppleLink: React.FC<AppleLinkProps> = ({ className }) => {
  return <NavLink href="https://www.apple.com/ua/" className={`link-to-us ${className}`} children={<AppleSvg />} />
}
