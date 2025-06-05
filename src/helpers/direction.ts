import { Position } from '../interfaces/position'
import { isAllowed } from './regexTest'

function goLeft(dict: string[][], current: Position) {
  try {
    return isAllowed(dict[current.y][current.x - 1]) ? dict[current.y][current.x - 1] : false
  } catch (error) {
    return false
  }
}

function goRight(dict: string[][], current: Position) {
  try {
    return isAllowed(dict[current.y][current.x + 1]) ? dict[current.y][current.x + 1] : false
  } catch (error) {
    return false
  }
}

function goUp(dict: string[][], current: Position) {
  try {
    return isAllowed(dict[current.y - 1][current.x]) ? dict[current.y - 1][current.x] : false
  } catch (error) {
    return false
  }
}

function goDown(dict: string[][], current: Position) {
  try {
    return isAllowed(dict[current.y + 1][current.x]) ? dict[current.y + 1][current.x] : false
  } catch (error) {
    return false
  }
}

export { goLeft, goRight, goUp, goDown }
