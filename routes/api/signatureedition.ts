import { HandlerContext } from '$fresh/server.ts'
import { cheerio } from 'https://deno.land/x/denocheerio@1.0.0/mod.ts'
import { Game } from '../../types/game.type.ts'

const getGames = async () => {
  const signatureEditionGamesResponses = await getSignatureEditionGamesResponses()
  const signatureEditionGamesTexts = await getSignatureEditionGamesTexts(
    signatureEditionGamesResponses.firstPageResponse,
    signatureEditionGamesResponses.secondPageResponse
  )

  return [...mapGames(signatureEditionGamesTexts.firstPageText), ...mapGames(signatureEditionGamesTexts.secondPageText)]
}

const getSignatureEditionGamesResponses = async () => {
  const firstPageResponse = await fetch('https://signatureeditiongames.com/collections/featured-switch')
  const secondPageResponse = await fetch('https://signatureeditiongames.com/collections/featured-switch?page=2&sort_by=manual')

  return { firstPageResponse, secondPageResponse }
}

const getSignatureEditionGamesTexts = async (firstPage: Response, secondPage: Response) => {
  const firstPageText = await firstPage.text()
  const secondPageText = await secondPage.text()

  return { firstPageText, secondPageText }
}

const mapGames = (webpage: string): Game[] => {
  const $ = cheerio.load(webpage)

  const gamesSelector = $(
    '.product-grid-item :has(.product-wrapper > .product-head > .product-image > .product-group-vendor-name > .product-name> a[href$="standard-edition-switch"])'
  )

  return gamesSelector
    .map((_i, el) => {
      const name = $(el).find('.product-head > .product-image > .product-group-vendor-name').text()
      const imageNoScriptText = $(el).find('.product-head > .product-image > .featured-img span noscript').text()
      const image = extractImageSrc(imageNoScriptText)
      const url = $(el).find('.product-head > .product-image > .product-group-vendor-name > .product-name > a').text()
      const price = $(el).find('.product-content > .pc-inner > .price-cart-wrapper > .product-price').text()

      return { name, image, url, price }
    })
    .get()
}

const extractImageSrc = (imageNoScriptText: string) => {
  const regex = /src\s*=\s*"(.+?)"/g
  const found = imageNoScriptText.match(regex)

  return found ? found[0].substring(5) : ''
}

export const handler = async (_req: Request, _ctx: HandlerContext): Promise<Response> => {
  const games = await getGames()
  return Response.json(games)
}
