import { HandlerContext } from '$fresh/server.ts'
import { cheerio } from 'https://deno.land/x/denocheerio@1.0.0/mod.ts'
import { Game } from '../../types/game.type.ts'

const getGames = async () => {
  const specialReserveGamesResponses = await getSpecialReserveGamesResponses()
  const specialReserveGamesTexts = await getSpecialReserveGamesTexts(
    specialReserveGamesResponses.firstPageResponse,
    specialReserveGamesResponses.secondPageResponse
  )

  return [...mapGames(specialReserveGamesTexts.firstPageText), ...mapGames(specialReserveGamesTexts.secondPageText)]
}

const getSpecialReserveGamesResponses = async () => {
  const firstPageResponse = await fetch('https://specialreservegames.com/games')
  const secondPageResponse = await fetch('https://specialreservegames.com/games/?sort=featured&page=2&limit=12')

  return { firstPageResponse, secondPageResponse }
}

const getSpecialReserveGamesTexts = async (firstPage: Response, secondPage: Response) => {
  const firstPageText = await firstPage.text()
  const secondPageText = await secondPage.text()

  return { firstPageText, secondPageText }
}

const mapGames = (webpage: string): Game[] => {
  const $ = cheerio.load(webpage)
  const gamesSelector = $('.card-wrapper :has(.card-figure > a > .card-img-container > .card-image[alt$="[SWITCH SINGLE]"])')

  return gamesSelector
    .map((_i, el) => {
      const imageSelector = $(el).find('.card-figure > a > .card-img-container > .card-image[alt$="[SWITCH SINGLE]"]').first()
      const name = imageSelector.attr('alt') || ''
      const image = imageSelector.attr('data-src') || ''
      const url = $(el).find('a').first().attr('href') || ''
      const price = $(el).parent().parent().find('.price--main').first().text() || ''

      return { name, image, url, price }
    })
    .get()
}

export const handler = async (_req: Request, _ctx: HandlerContext): Promise<Response> => {
  const games = await getGames()
  return Response.json(games)
}
