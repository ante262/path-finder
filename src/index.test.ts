import test from 'node:test'
import assert from 'assert/strict'
import { calculate } from '.'

test('case1', () => {
  const input = `  @---A---+
          |
  x-B-+   C
      |   |
      +---+`
  return assert.deepStrictEqual(calculate(input), {
    word: 'ACB',
    path: '@---A---+|C|+---+|+-B-x'
  })
})

test('case2', () => {
  const input = `  @
  | +-C--+
  A |    |
  +---B--+
    |      x
    |      |
    +---D--+`
  return assert.deepStrictEqual(calculate(input), {
    word: 'ABCD',
    path: '@|A+---B--+|+--C-+|-||+---D--+|x'
  })
})

test('case3', () => {
  const input = `  @---A---+
          |
  x-B-+   |
      |   |
      +---C`
  return assert.deepStrictEqual(calculate(input), {
    word: 'ACB',
    path: '@---A---+|||C---+|+-B-x'
  })
})

test('case4', () => {
  const input = `     +-O-N-+
     |     |
     |   +-I-+
 @-G-O-+ | | |
     | | +-+ E
     +-+     S
             |
             x`
  return assert.deepStrictEqual(calculate(input), {
    word: 'GOONIES',
    path: '@-G-O-+|+-+|O||+-O-N-+|I|+-+|+-I-+|ES|x'
  })
})

test('case5', () => {
  const input = ` +-L-+
 |  +A-+
@B+ ++ H
 ++    x`
  return assert.deepStrictEqual(calculate(input), {
    word: 'BLAH',
    path: '@B+++B|+-L-+A+++A-+Hx'
  })
})

test('case6', () => {
  const input = `  @-A--+
       |
       +-B--x-C--D`
  return assert.deepStrictEqual(calculate(input), {
    word: 'AB',
    path: '@-A--+|+-B--x'
  })
})

test('invalid1', () => {
  const input = `     -A---+
          |
  x-B-+   C
      |   |
      +---+`
  return assert.deepStrictEqual(calculate(input), Error('Error'))
})

test('invalid2', () => {
  const input = `   @--A---+
          |
    B-+   C
      |   |
      +---+`
  return assert.deepStrictEqual(calculate(input), Error('Error'))
})

test('invalid3', () => {
  const input = `   @--A-@-+
          |
  x-B-+   C
      |   |
      +---+`
  return assert.deepStrictEqual(calculate(input), Error('Error'))
})

test('invalid4', () => {
  const input = `   @--A---+
          |
          C
          x
      @-B-+`
  return assert.deepStrictEqual(calculate(input), Error('Error'))
})

test('invalid5', () => {
  const input = `   @--A--x

  x-B-+
      |
      @`
  return assert.deepStrictEqual(calculate(input), Error('Error'))
})

test('invalid6', () => {
  const input = `        x-B
          |
   @--A---+
          |
     x+   C
      |   |
      +---+`
  return assert.deepStrictEqual(calculate(input), Error('Error'))
})

test.only('invalid7', () => {
  const input = `   @--A-+
        |
         
        B-x`
  return assert.deepStrictEqual(calculate(input), Error('Error'))
})

test('invalid8', () => {
  const input = `  x-B-@-A-x`
  return assert.deepStrictEqual(calculate(input), Error('Error'))
})

test('invalid9', () => {
  const input = `  @-A-+-B-x`
  return assert.deepStrictEqual(calculate(input), Error('Error'))
})
