var input =
`     +-O-N-+
     |     |
     |   +-I-+
 @-G-O-+ | | |
     | | +-+ E
     +-+     S
             |
             x`;

var rows = input.split('\n')
var response = []

var dict = rows.map((row, index) => (index, row.split('')))

var goLeft = (current) => {
  if (current.x == 0) return false
  return /^[A-Z\-\+\|x]+$/.test(dict[current.y][current.x - 1]) ? dict[current.y][current.x - 1] : false
}
var goRight = (current) => {
  return /^[A-Z\-\+\|x]+$/.test(dict[current.y][current.x + 1]) ? dict[current.y][current.x + 1] : false
}
var goUp = (current) => {
  if (current.y == 0) return ''
  return /^[A-Z\|\+\-x]+$/.test(dict[current.y - 1][current.x]) ? dict[current.y - 1][current.x] : false
}
var goDown = (current) => {
  return /^[A-Z\|\+\-x]+$/.test(dict[current.y + 1][current.x]) ? dict[current.y + 1][current.x] : false
}
var canProceed = (current) => {
  return [goLeft(current),goRight(current),goUp(current),goDown(current)].some(p => p != false)
}

var rowOfStart = dict.findIndex(p => p.includes('@'))
var xyOfStart = {x: dict[rowOfStart].indexOf('@'), y: rowOfStart}
response.push({letter: '@', position: xyOfStart})
var pointer = ''

var position0 = structuredClone(xyOfStart)
var currentLetter = '';

if (canProceed(xyOfStart)){
  response.push({letter: [goLeft(xyOfStart),goRight(xyOfStart),goUp(xyOfStart),goDown(xyOfStart)].filter(x => x)[0], position: position0})
  if (goLeft(xyOfStart)) {position0.x --; pointer = 'left'}
  if (goRight(xyOfStart)) {position0.x ++; pointer = 'right'}
  if (goUp(xyOfStart)) {position0.y --; pointer = 'up'}
  if (goDown(xyOfStart)) {position0.y ++; pointer = 'down'}
}

var calculate = () => {
  while (currentLetter != 'x') {
    var position1 = structuredClone(position0)
    if (pointer == 'right') {
      if (currentLetter == '+') {
        if (goUp(position0)) {position1.y --; pointer = 'up'}
        else if (goDown(position0)) {position1.y ++; pointer = 'down'}
      }
      else if (goRight(position0)) {position1.x ++; pointer = 'right'}
    }
    else if (pointer == 'left') {
      if (currentLetter == '+') {
        if (goUp(position0)) {position1.y --; pointer = 'up'}
        else if (goDown(position0)) {position1.y ++; pointer = 'down'}
      }
      else if (goLeft(position0)) {position1.x --; pointer = 'left'}
    }
    else if (pointer == 'up') {
      if (currentLetter == '+') {
        if (goLeft(position0)) {position1.x --; pointer = 'left'}
        else if (goRight(position0)) {position1.x ++; pointer = 'right'}
      }
      else if (goUp(position0)) position1.y --
    }
    else if (pointer == 'down') {
      if (currentLetter == '+') {
        if (goLeft(position0)) {position1.x --; pointer = 'left'}
        else if (goRight(position0)) {position1.x ++; pointer = 'right'}
      }
      else if (goDown(position0)) {position1.y ++; pointer = 'down'}
    }
    currentLetter = dict[position1.y][position1.x]
    response.push({letter: currentLetter, position: position1})
    position0 = structuredClone(position1)
  }
}

calculate()

var filtered = response.filter(item => !['@','+','-','|','x'].includes(item.letter))
var distinct = filtered.filter((item, index, self) =>
  index === self.findIndex((t) => 
    t.position.x === item.position.x && 
    t.position.y === item.position.y
  ))
console.log(distinct.flatMap(p => p.letter).join(''))

console.log(response.flatMap(p => p.letter).join(''))