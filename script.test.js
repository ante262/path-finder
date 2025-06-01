const test = require('node:test');

const assert = require('assert/strict');

const {
  calculate
} = require('./script');


test('case1', () => {
  var input = 
  `  @---A---+
          |
  x-B-+   C
      |   |
      +---+`
  return assert.deepStrictEqual(calculate(input), 
    { 
      word: 'ACB', 
      path: '@---A---+|C|+---+|+-B-x'
    }
  );
});

test('case2', () => {
  var input = 
  `  @
  | +-C--+
  A |    |
  +---B--+
    |      x
    |      |
    +---D--+`
  return assert.deepStrictEqual(calculate(input), 
    { 
      word: 'ABCD', 
      path: '@|A+---B--+|+--C-+|-||+---D--+|x'
    }
  );
});

test('case3', () => {
  var input = 
  `  @---A---+
          |
  x-B-+   |
      |   |
      +---C`
  return assert.deepStrictEqual(calculate(input), 
    { 
      word: 'ACB', 
      path: '@---A---+|||C---+|+-B-x'
    }
  );
});

test('case4', () => {
  var input = 
  `     +-O-N-+
     |     |
     |   +-I-+
 @-G-O-+ | | |
     | | +-+ E
     +-+     S
             |
             x`
  return assert.deepStrictEqual(calculate(input), 
    { 
      word: 'GOONIES', 
      path: '@-G-O-+|+-+|O||+-O-N-+|I|+-+|+-I-+|ES|x'
    }
  );
});

test('case5', () => {
  var input = 
  ` +-L-+
 |  +A-+
@B+ ++ H
 ++    x`
  return assert.deepStrictEqual(calculate(input), 
    { 
      word: 'BLAH', 
      path: '@B+++B|+-L-+A+++A-+Hx'
    }
  );
});

test('case6', () => {
  var input = 
  `  @-A--+
       |
       +-B--x-C--D`
  return assert.deepStrictEqual(calculate(input), 
    { 
      word: 'AB', 
      path: '@-A--+|+-B--x'
    }
  );
});

test('invalid1', () => {
  var input = 
  `     -A---+
          |
  x-B-+   C
      |   |
      +---+`
  return assert.deepStrictEqual(calculate(input), 
    Error
  );
});

test('invalid2', () => {
  var input = 
  `   @--A---+
          |
    B-+   C
      |   |
      +---+`
  return assert.deepStrictEqual(calculate(input), 
    Error
  );
});

test('invalid3', () => {
  var input = 
  `   @--A-@-+
          |
  x-B-+   C
      |   |
      +---+`
  return assert.deepStrictEqual(calculate(input), 
    Error
  );
});

test('invalid4', () => {
  var input = 
  `   @--A---+
          |
          C
          x
      @-B-+`
  return assert.deepStrictEqual(calculate(input), 
    Error
  );
});

test('invalid5', () => {
  var input = 
  `   @--A--x

  x-B-+
      |
      @`
  return assert.deepStrictEqual(calculate(input), 
    Error
  );
});

test('invalid6', () => {
  var input = 
  `        x-B
          |
   @--A---+
          |
     x+   C
      |   |
      +---+`
  return assert.deepStrictEqual(calculate(input), 
    Error
  );
});

test('invalid7', () => {
  var input = 
  `   @--A-+
        |
         
        B-x`
  return assert.deepStrictEqual(calculate(input), 
    Error
  );
});

test('invalid8', () => {
  var input = 
  `  x-B-@-A-x`
  return assert.deepStrictEqual(calculate(input), 
    Error
  );
});

test('invalid9', () => {
  var input = 
  `  @-A-+-B-x`
  return assert.deepStrictEqual(calculate(input), 
    Error
  );
});