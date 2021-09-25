import { useState, useEffect } from 'react'

export const useLocalStorage = (): Storage | null => {
  const [storage, setStorage] = useState<null | Storage>(null)

  useEffect(() => {
    setStorage(localStorage)
    return () => {
      setStorage(null)
    }
  }, [])

  return storage
}
