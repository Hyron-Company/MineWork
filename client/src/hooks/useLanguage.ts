import { useGlobalState } from '../globalState'
import { Language, languages } from '../settings/languages'

export const useLanguage = (): Language => {
  const [language] = useGlobalState('language')

  return languages[language]
}
