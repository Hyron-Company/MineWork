import { IconButton } from '@mui/material'
import { Button } from '../atoms/Button'
import { useLanguage } from '../hooks/useLanguage'
import { Logo } from '../molecules/Logo'
import { Searcher } from '../molecules/Searcher'
import { UnionLeftSvg } from '../svg/UnionLeftSvg'
import { NavLink } from '../atoms/NavLink'
import { PersonaSvg } from '../svg/PersonaSvg'
import { ToggleLanguage } from '../molecules/ToggleLanguage'
import { SwitchTheme } from '../atoms/SwitchTheme'
import { useGlobalState } from '../globalState'

export const Header: React.FC = () => {
  const [showSidebar, setShowSidebar] = useGlobalState('showSidebar')
  const { subscription, aboutUs, login } = useLanguage()

  return (
    <div className="header">
      <div className={`header__item header__sidebar-zone ${showSidebar ? 'header__sidebar-zone_open' : 'header__sidebar-zone_close'}`}>
        <Logo />
        <IconButton onClick={() => setShowSidebar(true)}>
          <UnionLeftSvg />
        </IconButton>
      </div>
      <div className="header__item header__left">
        <Searcher />
        <Button variant="outlined" className="subscribe-button" text={subscription} />
        <NavLink href="/about-us" text={aboutUs} />
      </div>
      <div className="header__item header__right">
        <NavLink href="/login" text={login} >
          <PersonaSvg />
        </NavLink>
        <ToggleLanguage />
        <SwitchTheme />
      </div>
    </div>
  )
}