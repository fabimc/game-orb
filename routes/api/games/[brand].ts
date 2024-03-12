import { FreshContext } from '$fresh/server.ts'
import { getGames as getGamesFromBrand } from '../../../services/games.ts'
import { Game } from "../../../types/game.type.ts";

const getGames = async (brand: string): Promise<Game[]> => {
  try {
    const games = await getGamesFromBrand(brand)
    return games
  } catch (error) {
    console.error(`Error fetching games for ${brand}`, error)
    return []
  }
}

export const handler = async (_req: Request, ctx: FreshContext): Promise<Response> => {
  const games = await getGames(ctx.params.brand as string)

  return new Response(JSON.stringify(games))
}
