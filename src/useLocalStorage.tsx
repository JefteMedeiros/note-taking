import { useState } from "react"

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
}

// This hook uses local storage to store a value. It first checks if the initial
// value is a function, and if so, calls it to get the initial value.
// Otherwise, it uses the initial value directly.
// It then checks if the value is in local storage, and if so, parses it and returns it.
// Otherwise, it returns the initial value.
