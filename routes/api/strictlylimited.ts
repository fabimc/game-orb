import { HandlerContext } from '$fresh/server.ts'
import { cheerio } from 'https://deno.land/x/denocheerio@1.0.0/mod.ts'
import { Game } from '../../types/game.type.ts'

const getGames = async (siteUrl: string) => {
  const strictlyLimitedGamesResponses = await getStrictlyLimitedGamesResponses(siteUrl)
  const strictlyLimitedGamesTexts = await getStrictlyLimitedGamesTexts(
    strictlyLimitedGamesResponses.firstPageResponse,
    strictlyLimitedGamesResponses.secondPageResponse
  )

  return [...mapGames(strictlyLimitedGamesTexts.firstPageText, siteUrl), ...mapGames(strictlyLimitedGamesTexts.secondPageText, siteUrl)]
}

const getStrictlyLimitedGamesResponses = async (siteUrl: string) => {
  const firstPageResponse = await fetch(`${siteUrl}/collections/nintendo-switch`)
  const secondPageResponse = await fetch(`${siteUrl}/collections/nintendo-switch?page=2`)

  return { firstPageResponse, secondPageResponse }
}

const getStrictlyLimitedGamesTexts = async (firstPage: Response, secondPage: Response) => {
  const firstPageText = await firstPage.text()
  const secondPageText = await secondPage.text()

  return { firstPageText, secondPageText }
}

const mapGames = (webpage: string, siteUrl: string): Game[] => {
  const $ = cheerio.load(webpage)
  const gamesSelector = $('.grid-view-item')

  const games = gamesSelector
    .map((_i, el) => {
      const imageSelector = $(el).find('.grid-view-item__image').first()
      const name = $(el).find('.details > a').first().text() || ''
      const imageData = imageSelector.attr('data-bgset') || ''
      const image = imageData.substring(0, imageData.indexOf(' ')).replace('150x', '350x') || ''
      const url = siteUrl + $(el).find('a.grid-view-item__link').first().attr('href') || ''
      const price = $(el).find('.money').first().text() || ''

      return { name, image, url, price }
    })
    .get()

  return games.filter(
    (game) => !game.name.includes('Special Limited Edition') && !game.name.includes('Limited Edition Bundle') && !game.name.includes("Collector's Edition")
  )
}

export const handler = async (_req: Request, _ctx: HandlerContext): Promise<Response> => {
  const siteUrl = 'https://strictlylimitedgames.com'
  const games = await getGames(siteUrl)

  return Response.json(games)
}
