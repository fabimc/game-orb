import { useEffect, useState } from 'preact/hooks'

interface GamesProps {
  url: string;
}

interface Game {
  image: string
  name: string
  price: string
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
    (async () => {

      const games = await getGames(props.url)
      setGamesByBrand(games)

    })()
  }, [])

  return (
    <div class='container flex flex-wrap'>
      {gamesByBrand.map((game) => (
        <div class='w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col'>
          <a href={game.url}>
            <img class='hover:shadow-lg' src={game.image} />
            <div class='pt-3 flex items-center justify-between'>
              <p class=''>{game.name}</p>
            </div>
            <p class='pt-1 text-gray-900'>{game.price}</p>
          </a>
        </div>
      ))}
    </div>
  )
}
