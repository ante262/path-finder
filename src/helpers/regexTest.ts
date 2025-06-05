import { pathLetters, corner, letterEnd } from '../constants/appConstants'

function isLetter(letter: string) {
  return /^[A-Z]+$/.test(letter)
}

function isAllowed(letter: string) {
  const specialLettersExp: string = [...pathLetters, corner].map((item) => `\\${item}`).join('')
  const expression = new RegExp(`^[A-Z${specialLettersExp}${letterEnd}]+$`)
  return expression.test(letter)
}

export { isLetter, isAllowed }
