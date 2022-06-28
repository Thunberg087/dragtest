import { useState } from 'react'

const useArray = <T extends any>(
  initialArray: T[]
): {
  array: T[]
  push: (item: T, callback?: (array: T[]) => void) => void
  remove: (index: number) => void
  shift: () => void
  setArray: (array: T[]) => void
  updateElement: (index: number) => (newItem: T) => void
} => {
  const [array, setArrayDispatch] = useState<T[]>(initialArray)

  const push = (item: T, callback?: (array: T[]) => void) => {
    setArrayDispatch((oldArray) => {
      const newArray = [...oldArray, item]
      if (callback) {
        callback(newArray)
      }
      return newArray
    })
  }

  const setArray = (array: T[]) => {
    setArrayDispatch(array)
  }

  const remove = (index: number) => {
    if (index > -1) {
      setArrayDispatch((oldArray) => oldArray.filter((arr, i) => i !== index))
    }
  }

  const updateElement = (index: number) => (newItem: T) => {
    if (index > -1 && index < array.length) {
      setArrayDispatch((oldArray) => {
        const tempArr = [...oldArray]
        tempArr[index] = newItem
        return tempArr
      })
    }
  }

  const shift = () => {
    setArrayDispatch((oldArray) => {
      let tempArr = [...oldArray]
      tempArr.shift()
      return tempArr
    })
  }

  return { array, push, remove, shift, setArray, updateElement }
}

export default useArray
