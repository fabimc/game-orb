import { getGames as getSuperRareGames } from './superrare.ts'

export function getGames(brand: string) {
  if (brand === 'superrare') {
    return getSuperRareGames()
  }

  return Promise.resolve([])
}
