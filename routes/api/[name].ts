import { FreshContext } from "$fresh/server.ts";

const getUrl = (brand: string) => { 
  switch (brand) {
    case 'superrare':
      return 'https://superraregames.com/collections/featured'
    default:
      return ''
  }
}

const getGames = async (brand: string): Promise<string> => {
  const url = getUrl(brand)
  try {
    const gamesResponse = await fetch(url)
    const games = await gamesResponse.text()
    return games
  } catch (error) {
    console.error(`Error fetching games for ${brand} (${url})`, error)
    return ''
  }
}

export const handler = async (_req: Request, ctx: FreshContext): Promise<Response> => {
  const games = await getGames(ctx.params.name as string)

  return new Response(games)
}
