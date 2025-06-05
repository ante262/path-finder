import { letterStart, letterEnd, corner, pathLetters } from './constants/appConstants'
import { Pointer } from './enums/pointer'
import { goLeft, goRight, goUp, goDown } from './helpers/direction'
import { hasDuplicateStartOrFinish } from './helpers/hasDuplicateStartOrFinish'
import { isLetter } from './helpers/regexTest'
import { LetterPosition } from './interfaces/letterPosition'
import { Position } from './interfaces/position'

export const calculate = (input: string) => {
  var letterPositions: LetterPosition[] = []
  var rows: string[] = input.split('\n')
  var dict: string[][] = rows.map((row) => row.split(''))

  var rowOfStart = dict.findIndex((p) => p.includes(letterStart))
  if (rowOfStart === -1) return Error
  if (hasDuplicateStartOrFinish(dict.flat())) return Error

  var rowOfEnd = dict.findIndex((p) => p.includes(letterEnd))
  if (rowOfEnd === -1) return Error

  var pointer = Pointer.start
  var currentLetter = letterStart
  var position0: Position = { x: dict[rowOfStart].indexOf(letterStart), y: rowOfStart }
  letterPositions.push({ letter: currentLetter, position: position0 })

  var iterate = () => {
    while (currentLetter !== letterEnd) {
      var position1 = structuredClone(position0)
      switch (pointer) {
        case Pointer.start:
          if (goLeft(dict, position0)) {
            position1.x--
            pointer = Pointer.left
          } else if (goRight(dict, position0)) {
            position1.x++
            pointer = Pointer.right
          } else if (goUp(dict, position0)) {
            position1.y--
            pointer = Pointer.up
          } else if (goDown(dict, position0)) {
            position1.y++
            pointer = Pointer.down
          }
          break
        case Pointer.right:
          if (currentLetter === corner) {
            if (goUp(dict, position0)) {
              position1.y--
              pointer = Pointer.up
            } else if (goDown(dict, position0)) {
              position1.y++
              pointer = Pointer.down
            } else return Error
          } else if (goRight(dict, position0)) position1.x++
          else if (isLetter(currentLetter)) {
            if (goUp(dict, position0)) {
              position1.y--
              pointer = Pointer.up
            } else if (goDown(dict, position0)) {
              position1.y++
              pointer = Pointer.down
            } else return Error
          } else return Error
          break
        case Pointer.left:
          if (currentLetter === corner) {
            if (goUp(dict, position0)) {
              position1.y--
              pointer = Pointer.up
            } else if (goDown(dict, position0)) {
              position1.y++
              pointer = Pointer.down
            } else return Error
          } else if (goLeft(dict, position0)) position1.x--
          else if (isLetter(currentLetter)) {
            if (goUp(dict, position0)) {
              position1.y--
              pointer = Pointer.up
            } else if (goDown(dict, position0)) {
              position1.y++
              pointer = Pointer.down
            } else return Error
          } else return Error
          break
        case Pointer.up:
          if (currentLetter === corner) {
            if (goLeft(dict, position0)) {
              position1.x--
              pointer = Pointer.left
            } else if (goRight(dict, position0)) {
              position1.x++
              pointer = Pointer.right
            } else return Error
          } else if (goUp(dict, position0)) position1.y--
          else if (isLetter(currentLetter)) {
            if (goLeft(dict, position0)) {
              position1.x--
              pointer = Pointer.left
            } else if (goRight(dict, position0)) {
              position1.x++
              pointer = Pointer.right
            } else return Error
          } else return Error
          break
        case Pointer.down:
          if (currentLetter === corner) {
            if (goLeft(dict, position0)) {
              position1.x--
              pointer = Pointer.left
            } else if (goRight(dict, position0)) {
              position1.x++
              pointer = Pointer.right
            } else return Error
          } else if (goDown(dict, position0)) position1.y++
          else if (isLetter(currentLetter)) {
            if (goLeft(dict, position0)) {
              position1.x--
              pointer = Pointer.left
            } else if (goRight(dict, position0)) {
              position1.x++
              pointer = Pointer.right
            } else return Error
          } else return Error
          break
        default:
          return Error
      }
      currentLetter = dict[position1.y][position1.x]
      letterPositions.push({ letter: currentLetter, position: position1 })
      position0 = structuredClone(position1)
    }
  }

  iterate()

  var filtered = letterPositions.filter((item) => ![letterStart, corner, ...pathLetters, letterEnd].includes(item.letter))
  var distinct = filtered.filter(
    (item, index, self) =>
      index === self.findIndex((t) => t.position.x === item.position.x && t.position.y === item.position.y)
  )

  const word = distinct.flatMap((p) => p.letter).join('')

  const path = letterPositions.flatMap((p) => p.letter).join('')
  if (!path.endsWith(letterEnd)) return Error

  return {
    word,
    path
  }
}
