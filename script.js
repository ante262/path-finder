const calculate = (input) => {
  var rows = input.split('\n')
  var response = []

  var dict = rows.map((row, index) => (index, row.split('')))

  var goLeft = (current) => {
    try {
      return /^[A-Z\-\+\|x]+$/.test(dict[current.y][current.x - 1]) ? dict[current.y][current.x - 1] : false
    } catch (error) {
      return  false
    }
  }
  var goRight = (current) => {
    try {
      return /^[A-Z\-\+\|x]+$/.test(dict[current.y][current.x + 1]) ? dict[current.y][current.x + 1] : false
    } catch (error) {
      return false
    }
  }
  var goUp = (current) => {
    try {
      return /^[A-Z\|\+\-x]+$/.test(dict[current.y - 1][current.x]) ? dict[current.y - 1][current.x] : false
    } catch (error) {
      return false
    }
  }
  var goDown = (current) => {
    try {
      return /^[A-Z\|\+\-x]+$/.test(dict[current.y + 1][current.x]) ? dict[current.y + 1][current.x] : false
    } catch (error) {
      return false
    }
  }
  var canProceed = (current) => {
    return [goLeft(current),goRight(current),goUp(current),goDown(current)].some(p => p != false)
  }

  var hasDuplicateStartOrFinish = (arr) => {
    return arr.filter(item => item === '@').length > 1 ||
      arr.filter(item => item === 'x').length > 1
  }

  var rowOfStart = dict.findIndex(p => p.includes('@'))
  if (rowOfStart === -1) return Error;
  if (hasDuplicateStartOrFinish(dict.flat())) return Error;
  var rowOfEnd = dict.findIndex(p => p.includes('x'))
  if (rowOfEnd === -1) return Error;
  var xyOfStart = {x: dict[rowOfStart].indexOf('@'), y: rowOfStart}
  response.push({letter: '@', position: xyOfStart})
  var pointer = ''

  var position0 = structuredClone(xyOfStart)
  var currentLetter = '';

  if (canProceed(xyOfStart)){
    response.push({letter: [goLeft(xyOfStart), goRight(xyOfStart), goUp(xyOfStart), goDown(xyOfStart)].filter(x => x)[0], position: position0})
    if (goLeft(xyOfStart)) {position0.x --; pointer = 'left'}
    if (goRight(xyOfStart)) {position0.x ++; pointer = 'right'}
    if (goUp(xyOfStart)) {position0.y --; pointer = 'up'}
    if (goDown(xyOfStart)) {position0.y ++; pointer = 'down'}
  }

  var iterate = () => {
    while (currentLetter !== 'x') {
      var position1 = structuredClone(position0)
      if (pointer == 'right') {
        if (currentLetter == '+') {
          if (goUp(position0)) {position1.y --; pointer = 'up'}
          else if (goDown(position0)) {position1.y ++; pointer = 'down'}
          else return Error;
        }
        else if (goRight(position0)) position1.x ++
        else if (/^[A-Z]+$/.test(currentLetter)) {
          if (goUp(position0)) {position1.y --; pointer = 'up'}
          else if (goDown(position0)) {position1.y ++; pointer = 'down'}
          else return Error;
        }
        else return Error;
      }
      else if (pointer == 'left') {
        if (currentLetter == '+') {
          if (goUp(position0)) {position1.y --; pointer = 'up'}
          else if (goDown(position0)) {position1.y ++; pointer = 'down'}
          else return Error;
        }
        else if (goLeft(position0)) position1.x --
        else if (/^[A-Z]+$/.test(currentLetter)) {
          if (goUp(position0)) {position1.y --; pointer = 'up'}
          else if (goDown(position0)) {position1.y ++; pointer = 'down'}
          else return Error;
        }
        else return Error;
      }
      else if (pointer == 'up') {
        if (currentLetter == '+') {
          if (goLeft(position0)) {position1.x --; pointer = 'left'}
          else if (goRight(position0)) {position1.x ++; pointer = 'right'}
          else return Error;
        }
        else if (goUp(position0)) position1.y --
        else if (/^[A-Z]+$/.test(currentLetter)) {
          if (goLeft(position0)) {position1.x --; pointer = 'left'}
          else if (goRight(position0)) {position1.x ++; pointer = 'right'}
          else return Error;
        }
        else return Error;
      }
      else if (pointer == 'down') {
        if (currentLetter == '+') {
          if (goLeft(position0)) {position1.x --; pointer = 'left'}
          else if (goRight(position0)) {position1.x ++; pointer = 'right'}
          else return Error;
        }
        else if (goDown(position0)) position1.y ++
        else if (/^[A-Z]+$/.test(currentLetter)) {
          if (goLeft(position0)) {position1.x --; pointer = 'left'}
          else if (goRight(position0)) {position1.x ++; pointer = 'right'}
          else return Error;
        }
        else return Error;
      }
      currentLetter = dict[position1.y][position1.x]
      response.push({letter: currentLetter, position: position1})
      position0 = structuredClone(position1)
    }
  }

  iterate()

  var filtered = response.filter(item => !['@','+','-','|','x'].includes(item.letter))
  var distinct = filtered.filter((item, index, self) =>
    index === self.findIndex((t) => 
      t.position.x === item.position.x && 
      t.position.y === item.position.y
    ))

  const word = distinct.flatMap(p => p.letter).join('')

  const path = response.flatMap(p => p.letter).join('')
  if (!path.endsWith('x')) return Error;
  
  return {
    word,
    path
  }
}

module.exports = {
  calculate
}