import { letterStart, letterEnd } from '../constants/appConstants'

export function hasDuplicateStartOrFinish(allLetters: string[]) {
  return (
    allLetters.filter((item) => item === letterStart).length > 1 ||
    allLetters.filter((item) => item === letterEnd).length > 1
  )
}
