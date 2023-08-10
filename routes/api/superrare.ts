import { HandlerContext } from '$fresh/server.ts'
import { cheerio } from 'https://deno.land/x/denocheerio@1.0.0/mod.ts'
import { Game } from '../../types/game.type.ts'

const getGames = async (siteUrl: string) => {
  const superRareGamesResponse = await fetch(`${siteUrl}/collections/featured`)

  if (superRareGamesResponse.status === 404) {
    return []
  }
  const superRareGamesText = await superRareGamesResponse.text()
  const superRareGames = mapGames(superRareGamesText, siteUrl)

  return superRareGames
}

const mapGames = (webpage: string, siteUrl: string): Game[] => {
  const $ = cheerio.load(webpage)
  const gamesSelector = $('.product-card')

  const games = gamesSelector
    .map((_i: number, el: cheerio.Element) => {
      const imageSelector = $(el).find('img').first()
      const name = $(el).find('.badge--sold_out').first().text() || imageSelector.attr('alt') || ''
      const image = imageSelector.attr('src') || ''
      const url = siteUrl + $(el).find('a').first().attr('href') || ''
      const price = $(el).find('.money').first().text() || ''

      return { name, image, url, price }
    })
    .get()

    const singles = games.filter((game) => game.name.startsWith('SRG#'))

    // removes duplicates
    return [...new Map(singles.map((game) => [game.name, game])).values()];
}

export const handler = async (_req: Request, _ctx: HandlerContext): Promise<Response> => {
  const siteUrl = 'https://superraregames.com'
  const games = await getGames(siteUrl)
  
  return Response.json(games)
}
