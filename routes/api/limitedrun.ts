import { HandlerContext } from '$fresh/server.ts'
import { cheerio } from 'https://deno.land/x/denocheerio@1.0.0/mod.ts'
import { Game } from '../../types/game.type.ts'

const getGames = async (siteUrl: string) => {
  const limitedRunResponse = await fetch(`${siteUrl}/collections/nintendo-switch-games`)
  if (limitedRunResponse.status === 404) {
    return []
  }
  const limitedRunText = await limitedRunResponse.text()
  const limitedRunGames = mapGames(limitedRunText, siteUrl)

  return limitedRunGames
}

const mapGames = (webpage: string, siteUrl: string): Game[] => {
  const $ = cheerio.load(webpage)
  const gamesSelector = $('.collection__list .product--default')

  return gamesSelector
    .map((_i: number, el: cheerio.Element) => {
      const imagesSelector = $(el).find('.product__image').first()

      if (!imagesSelector || imagesSelector.length === 0) {
        return null
      }

      const imageSelector = $(imagesSelector[0]).find('img').first()
      const infoSelector = $(el).find('.product__info').first()

      const name = imageSelector.attr('alt') || ''
      const image = imageSelector.attr('src') || ''
      const url = siteUrl + $(infoSelector).parent().attr('href') || ''
      const price = $(infoSelector).find('.price').first().text() || ''

      return { name, image, url, price }
    })
    .get()
    .filter((game: Game) => Number(game?.price.trimStart().slice(1)) < 50)
}

export const handler = async (_req: Request, _ctx: HandlerContext): Promise<Response> => {
  const siteUrl = 'https://limitedrungames.com'
  const games = await getGames(siteUrl)

  return Response.json(games)
}
