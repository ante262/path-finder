function isLetter(letter: string) {
  return /^[A-Z]+$/.test(letter)
}

function isAllowed(letter: string) {
  return /^[A-Z\-\+\|x]+$/.test(letter)
}

export {
  isLetter,
  isAllowed
}