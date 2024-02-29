import { type Game } from '../types/game.type.ts'

export const getGames = async (url: string): Promise<Game[]> => {
  const gamesResponse = await fetch(url)

  if (gamesResponse.status === 404) {
    return []
  }
  const games = await gamesResponse.json()

  return games
}
