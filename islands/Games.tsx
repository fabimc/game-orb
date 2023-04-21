import { useEffect, useState } from 'preact/hooks'
import { Game } from '../types/game.type.ts'

interface GamesProps {
  url: string
}

const getGames = async (url: string): Promise<Game[]> => {
  const gamesResponse = await fetch(url)

  if (gamesResponse.status === 404) {
    return []
  }
  const games = await gamesResponse.json()

  return games
}

export default function Games(props: GamesProps) {
  const [gamesByBrand, setGamesByBrand] = useState<Game[]>([])

  useEffect(() => {
    ;(async () => {
      const games = await getGames(props.url)
      setGamesByBrand(games)
    })()
  }, [])

  return (
    <div class='container flex flex-wrap'>
      {gamesByBrand.length === 0 && (
        <div class='w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col'>
          <div class='w-60 h-80 rounded-md mx-auto mt-1'>
            <div class='flex animate-pulse flex-row items-center h-full justify-center space-x-5'>
              <div class='flex flex-col space-y-3'>
                <div class='w-60 bg-gray-300 h-60'></div>
                <div class='w-36 bg-gray-300 h-6 rounded-md'></div>
                <div class='w-24 bg-gray-300 h-6 rounded-md'></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {gamesByBrand.map((game) => (
        <div class='w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col'>
          <a href={game.url}>
            <img class='hover:shadow-lg' src={game.image} />
            <div class='pt-3 flex items-center justify-between'>
              <p>{game.name}</p>
            </div>
            <p class='pt-1 text-gray-900'>{game.price}</p>
          </a>
        </div>
      ))}
    </div>
  )
}
