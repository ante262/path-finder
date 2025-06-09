import { letterEnd, corner, letterStart } from '../constants/appConstants'
import { Pointer } from '../enums/pointer'
import { LetterPosition } from '../interfaces/letterPosition'
import { Position } from '../interfaces/position'
import { goLeft, goRight, goUp, goDown } from './direction'
import { isLetter } from './regexTest'

export function iterate(currentLetter: string, dict: string[][], rowOfStart: number): LetterPosition[] | Error {
  let letterPositions: LetterPosition[] = []
  let pointer = Pointer.start
  let position0: Position = { x: dict[rowOfStart].indexOf(letterStart), y: rowOfStart }

  letterPositions.push({ letter: currentLetter, position: position0 })

  while (currentLetter !== letterEnd) {
    let position1 = structuredClone(position0)
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
        } else return new Error('Bad input')
        break
      case Pointer.right:
        if (currentLetter === corner) {
          if (goUp(dict, position0)) {
            position1.y--
            pointer = Pointer.up
          } else if (goDown(dict, position0)) {
            position1.y++
            pointer = Pointer.down
          } else return new Error('Bad input')
        } else if (goRight(dict, position0)) position1.x++
        else if (isLetter(currentLetter)) {
          if (goUp(dict, position0)) {
            position1.y--
            pointer = Pointer.up
          } else if (goDown(dict, position0)) {
            position1.y++
            pointer = Pointer.down
          } else return new Error('Bad input')
        } else return new Error('Bad input')
        break
      case Pointer.left:
        if (currentLetter === corner) {
          if (goUp(dict, position0)) {
            position1.y--
            pointer = Pointer.up
          } else if (goDown(dict, position0)) {
            position1.y++
            pointer = Pointer.down
          } else return new Error('Bad input')
        } else if (goLeft(dict, position0)) position1.x--
        else if (isLetter(currentLetter)) {
          if (goUp(dict, position0)) {
            position1.y--
            pointer = Pointer.up
          } else if (goDown(dict, position0)) {
            position1.y++
            pointer = Pointer.down
          } else return new Error('Bad input')
        } else return new Error('Bad input')
        break
      case Pointer.up:
        if (currentLetter === corner) {
          if (goLeft(dict, position0)) {
            position1.x--
            pointer = Pointer.left
          } else if (goRight(dict, position0)) {
            position1.x++
            pointer = Pointer.right
          } else return new Error('Bad input')
        } else if (goUp(dict, position0)) position1.y--
        else if (isLetter(currentLetter)) {
          if (goLeft(dict, position0)) {
            position1.x--
            pointer = Pointer.left
          } else if (goRight(dict, position0)) {
            position1.x++
            pointer = Pointer.right
          } else return new Error('Bad input')
        } else return new Error('Bad input')
        break
      case Pointer.down:
        if (currentLetter === corner) {
          if (goLeft(dict, position0)) {
            position1.x--
            pointer = Pointer.left
          } else if (goRight(dict, position0)) {
            position1.x++
            pointer = Pointer.right
          } else return new Error('Bad input')
        } else if (goDown(dict, position0)) position1.y++
        else if (isLetter(currentLetter)) {
          if (goLeft(dict, position0)) {
            position1.x--
            pointer = Pointer.left
          } else if (goRight(dict, position0)) {
            position1.x++
            pointer = Pointer.right
          } else return new Error('Bad input')
        } else return new Error('Bad input')
        break
      default:
        return new Error('Bad input')
    }
    currentLetter = dict[position1.y][position1.x]
    letterPositions.push({ letter: currentLetter, position: position1 })
    position0 = structuredClone(position1)
  }

  return letterPositions
}
