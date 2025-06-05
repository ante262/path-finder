export function hasDuplicateStartOrFinish(allLetters: string[], letterStart: string, letterEnd: string) {
  return allLetters.filter(item => item === letterStart).length > 1 ||
    allLetters.filter(item => item === letterEnd).length > 1
}