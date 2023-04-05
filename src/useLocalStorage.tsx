import { useEffect, useState } from "react"

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key)
    if (jsonValue == null) {
      if (typeof initialValue === "function") {
        return (initialValue as () => T)()
      } else {
        return initialValue
      }
    } else {
      return JSON.parse(jsonValue)
    }
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as [T, typeof setValue]
}

// It will first check if the initial value from local store is null.
// If it is, it will check if the initial value is a function
// If it is, it will call the function and return the value
// If it is not, it will return the initial value
// If it is not null, it will parse the value and return it
