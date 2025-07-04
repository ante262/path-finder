import { letterStart, letterEnd, corner, pathLetters } from './constants/appConstants'
import { hasDuplicateStartOrFinish } from './helpers/hasDuplicateStartOrFinish'
import { iterate } from './helpers/iterate'

export const calculate = (input: string) => {
  const rows: string[] = input.split('\n')
  const dict: string[][] = rows.map((row) => row.split(''))

  const rowOfStart = dict.findIndex((p) => p.includes(letterStart))
  if (rowOfStart === -1) return new Error('Error')
  if (hasDuplicateStartOrFinish(dict.flat())) return new Error('Error')

  const rowOfEnd = dict.findIndex((p) => p.includes(letterEnd))
  if (rowOfEnd === -1) return new Error('Error')

  const letterPositions = iterate(letterStart, dict, rowOfStart)
  if (letterPositions instanceof Error) return new Error('Error')

  const filtered = letterPositions.filter((item) => ![letterStart, corner, ...pathLetters, letterEnd].includes(item.letter))
  const distinct = filtered.filter(
    (item, index, self) =>
      index === self.findIndex((t) => t.position.x === item.position.x && t.position.y === item.position.y)
  )

  const word = distinct.flatMap((p) => p.letter).join('')

  const path = letterPositions.flatMap((p) => p.letter).join('')
  if (!path.endsWith(letterEnd)) return new Error('Error')

  return {
    word,
    path
  }
}
