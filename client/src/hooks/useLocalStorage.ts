import { useState, useEffect } from 'react'

export const useLocalStorage = (): Storage | undefined => {
  const [storage, setStorage] = useState<Storage>()

  useEffect(() => {
    setStorage(localStorage)
    return () => {
      setStorage(undefined)
    }
  }, [])

  return storage
}
