import { useEffect } from 'react'
import { useGlobalState } from '../globalState'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useLocalStorageItem } from '../hooks/useLocalStorageItem'
import { Theme } from '../settings/themes'
import { camelToKebabCase } from './functions'

export const ObserveTheme = (): void => {
  const [theme] = useGlobalState('theme')

  useEffect(() => {
    const body = document.querySelector('body')

    for (const variable of Object.keys(theme)) {
      const cssVariable = `--${camelToKebabCase(variable)}`

      body?.style.setProperty(cssVariable, theme[variable])
    }
  }, [theme])
}

export const Initialize = (): void => {
  const [, setTheme] = useGlobalState('theme')
  const [, setLanguage] = useGlobalState('language')
  const storage = useLocalStorage()

  const language = storage?.getItem('language')
  const theme = useLocalStorageItem<Theme>('theme')

  useEffect(() => {
    if (language) {
      setLanguage(language)
    }

    if (theme) {
      setTheme(theme)
    }
  }, [language, theme, setLanguage, setTheme])
}
