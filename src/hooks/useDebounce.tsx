import {useEffect, useState} from 'react'

export function useDebounce(value: number, delay?: number): number {
  const [debouncedValue, setDebouncedValue] = useState<number>(value)

  useEffect(() => {
    setDebouncedValue(0)
    let timer: NodeJS.Timeout, setZero: NodeJS.Timeout
    timer = setTimeout(() => {
      setDebouncedValue(value)
      setZero = setTimeout(() => {
        setDebouncedValue(0)
      }, 10)
    }, delay)

    return () => {
      clearTimeout(timer)
      clearTimeout(setZero)
    }
  }, [value])

  return debouncedValue
}