import { useEffect, useState } from 'preact/hooks'
import { Game } from '../types/game.type.ts'
import GameSkeleton from "../components/GameSkeleton.tsx"

type GamesProps = {
  brand: string
}

export default function Games(props: GamesProps) {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    ;(async () => {
      const response = await fetch(`api/games/${props.brand}`)
      const gamesData = await response.json() as Game[]
      setGames(gamesData)
    })()
  }, [])

  return (
    <>
      {games.length === 0 && <GameSkeleton />}
      {games.map((game) => (
        <div class='w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col'>
          <a href={game.url}>
            <img class='hover:grow hover:shadow-lg' src={game.image} />
            <div class='pt-3 flex items-center justify-between'>
              <p class='bg-gradient-to-r from-green-200 to-green-100 bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px] dark:from-purple-800 dark:to-purple-900'>
                {game.name}
              </p>
            </div>
            <p class='pt-1 text-gray-900'>{game.price}</p>
          </a>
        </div>
      ))}
    </>
  )
}
