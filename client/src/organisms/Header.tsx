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
import { LoginButton } from '../atoms/LoginButton'

export const Header: React.FC = () => {
  const [, setOpen] = useGlobalState('followPopup')
  const { subscription, aboutUs, login } = useLanguage()

  return (
    <header className="header">
      <div className="header__item header__panel-zone">
        <Logo />
        <IconButton>
          <UnionLeftSvg />
        </IconButton>
      </div>
      <div className="header__item header__left">
        <Searcher />
        <Button variant="outlined" className="subscribe-button" text={subscription} />
        <NavLink href="/about-us" text={aboutUs} />
      </div>
      <div className="header__item header__right">
        <LoginButton onClick={() => setOpen(true)} text={login}>
          <PersonaSvg />
        </LoginButton>
        <ToggleLanguage />
        <SwitchTheme />
      </div>
    </header>
  )
}
