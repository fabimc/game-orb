import { cheerio } from 'https://deno.land/x/denocheerio@1.0.0/mod.ts'
import { Game } from '../types/game.type.ts'

const superRareUrl = 'https://superraregames.com' as const

const mapGames = (webpage: string, siteUrl: string) => {
  const $ = cheerio.load(webpage)
  const gamesSelector = $('.product-card:not(:has(badge--sold-out))')

  const games = gamesSelector
    .map((_i: number, el: cheerio.Element) => {
      const imageSrcSet = $(el).find('img').first().attr('srcset')
      const image = imageSrcSet?.substring(0, imageSrcSet.indexOf(' '))
      const anchorSelector = $(el).find('a.product-card__heading').first()
      const name = anchorSelector.text()
      const url = siteUrl + anchorSelector.attr('href')
      const price = $(el).find('.money').first().text()

      return { name, image, url, price }
    })
    .get()

  const singles = games.filter((game) => game.name.startsWith('SRG#'))

  return singles as Game[]
}

export const getGames = async () => {
  try {
    const superRareGamesResponse = await fetch('api/superrare')
    const superRareGamesText = await superRareGamesResponse.text()
    const superRareGames = mapGames(superRareGamesText, superRareUrl)
  
    return superRareGames
  } catch (error) {
    console.error('Error fetching SuperRare Games', error)
    return []
  }
  
}
