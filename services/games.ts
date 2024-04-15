import { getGames as getSuperRareGames } from './superrare.ts'
import { getGames as getLimitedRunGames } from './limitedrun.ts'
import { getGames as getStrictlyLimitedGames } from './strictlylimited.ts'

type BrandUrl = {
  [key: string]: string
}

const brandUrls: BrandUrl = {
  superrare: 'https://superraregames.com',
  limitedrun: 'https://limitedrungames.com',
  strictlylimited: 'https://strictlylimitedgames.com', 
} as const

export const getGames = (brand: string) => {
  const url = brandUrls[brand]
  switch (brand) {
    case 'superrare':
      return getSuperRareGames(url)
    case 'limitedrun':
      return getLimitedRunGames(url)
    case 'strictlylimited':
      return getStrictlyLimitedGames(url)
    default:
      return Promise.resolve([])
  }
}
