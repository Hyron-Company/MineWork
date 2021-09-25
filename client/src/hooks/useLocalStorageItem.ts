import { useLocalStorage } from './useLocalStorage'

export function useLocalStorageItem<T>(name: string): T | null {
  const storage = useLocalStorage()

  return JSON.parse(storage?.getItem(name) || 'null')
}
