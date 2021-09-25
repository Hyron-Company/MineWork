import { IconButton } from '@mui/material'
import { useGlobalState } from '../globalState'
import { DarkThemeSvg } from '../svg/DarkThemeSvg'
import { LightThemeSvg } from '../svg/LightThemeSvg'
import { dark, light, Theme } from '../settings/themes'
import { useLocalStorage } from '../hooks/useLocalStorage'

export const SwitchTheme: React.FC = () => {
  const [theme, setTheme] = useGlobalState('theme')
  const storage = useLocalStorage()

  const editTheme = (theme: Theme) => {
    setTheme(theme)
    storage?.setItem('theme', JSON.stringify(theme))
  }

  const handleClick = () => {
    if (theme.name === 'light') {
      editTheme(dark)
    } else {
      editTheme(light)
    }
  }
  return (
    <IconButton onClick={handleClick} className="switch-theme">
      {theme.name === 'light' ? <DarkThemeSvg /> : <LightThemeSvg />}
    </IconButton>
  )
}
