import { getGames as getSuperRareGames } from './superrare.ts'
import { getGames as getLimitedRunGames } from './limitedrun.ts'

export function getGames(brand: string) {
  switch (brand) {
    case 'superrare':
      return getSuperRareGames()
    case 'limitedrun':
      return getLimitedRunGames()
    default:
      return Promise.resolve([])
  }
}
