import { IconButton } from '@mui/material'
import React from 'react'
import { useGlobalState } from '../globalState'
import { Logo } from '../molecules/Logo'
import { UnionRightSvg } from '../svg/UnionRightSvg'

export const Sidebar: React.FC = () => {
  const [showSidebar, setShowSidebar] = useGlobalState('showSidebar')
  return (
    <div className={`sidebar ${showSidebar ? 'sidebar_open' : 'sidebar_close'}`}>
      <div className="sidebar__header-zone">
        <Logo />
        <IconButton onClick={() => setShowSidebar(false)}>
          <UnionRightSvg />
        </IconButton>
      </div>

    </div>
  )
}