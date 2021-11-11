import Flags from 'country-flag-icons/react/1x1'
import React, { useState } from 'react'
import { Button, Menu, MenuItem } from '@mui/material'
import { useGlobalState } from '../globalState'
import { SelectArrowSvg } from '../svg/SelectArrowSvg'
import { languages } from '../settings/languages'
import { useLocalStorage } from '../hooks/useLocalStorage'

export const ToggleLanguage: React.FC = () => {
  const [anchor, setAnchor] = useState<HTMLElement>()
  const [language, setLanguage] = useGlobalState('language')
  const storage = useLocalStorage()

  const showMenu = Boolean(anchor)
  const Flag = Flags[language]

  const toggleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(anchor ? undefined : event.currentTarget)
  }

  const handleSelectLanguage = (lang: string) => {
    setLanguage(lang)
    storage?.setItem('language', lang)
    setAnchor(undefined)
  }

  return (
    <div className="toggle-language">
      <Button aria-expanded={showMenu ? 'true' : undefined} onClick={toggleMenu} className="toggle-language__button">
        <Flag className="toggle-language__flag" />
        {language}
        <SelectArrowSvg />
      </Button>
      <Menu open={showMenu} anchorEl={anchor} onClose={toggleMenu}>
        {Object.keys(languages).map(lang => (
          <MenuItem key={lang} onClick={() => handleSelectLanguage(lang)} className="toggle-language__menu-item">
            {lang}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}
