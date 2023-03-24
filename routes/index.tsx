import { Handlers, PageProps } from '$fresh/server.ts'
import { cheerio } from 'https://deno.land/x/denocheerio@1.0.0/mod.ts'

interface Game {
  image: string
  name: string
  price: string
  url: string
}

interface GameStores {
  superRareGames: Game[]
  specialReserveGames: Game[]
}

const sites = {
  superRareGames: {
    name: 'Super Rare Games',
    baseUrl: 'https://superraregames.com',
    url: 'https://superraregames.com/collections/all'
  },
  limitedRunGames: {
    name: 'Limited Run Games',
    baseUrl: 'https://limitedrungames.com',
    url: 'https://limitedrungames.com/collections/nintendo-switch-games'
  },
  specialReserveGames: {
    name: 'Special Reserve Games',
    baseUrl: 'https://specialreservegames.com',
    url: 'https://specialreservegames.com/games'
  }
}

export const handler: Handlers<GameStores> = {
  async GET(_, ctx) {
    const superRareGamesResponse = await fetch(sites.superRareGames.url)
    const specialReserveGamesResponses = await getSpecialReserveGamesResponses()

    if (superRareGamesResponse.status === 404) {
      return ctx.render()
    }

    const superRareGamesText = await superRareGamesResponse.text()
    const specialReserveGamesTexts = await getSpecialReserveGamesTexts(
      specialReserveGamesResponses.firstPageResponse,
      specialReserveGamesResponses.secondPageResponse
    )

    const superRareGames = getSuperRareGames(
      superRareGamesText,
      sites.superRareGames.baseUrl
    )

    const specialReserveGames = [
      ...getSpecialReserveGames(
        specialReserveGamesTexts.firstPageText,
        sites.specialReserveGames.baseUrl
      ),
      ...getSpecialReserveGames(
        specialReserveGamesTexts.secondPageText,
        sites.specialReserveGames.baseUrl
      )
    ]

    const gameStores = {
      superRareGames,
      specialReserveGames
    }

    return ctx.render(gameStores)
  }
}

const getSuperRareGames = (webpage: string, baseUrl: string): Game[] => {
  const $ = cheerio.load(webpage)

  const gamesSelector = $(
    '.product-collection :has(.img-wrap > .img-container img.rotateShadow[alt^="SRG#"])'
  )

  return gamesSelector
    .map((_i, el) => {
      const imageSelector = $(el)
        .find('.img-wrap > .img-container img.rotateShadow[alt^="SRG#"]')
        .first()
      const name = imageSelector.attr('alt') || ''
      const image = imageSelector.attr('src') || ''
      const url =
        baseUrl +
          $(el).find('.img-wrap > .img-container > a').first().attr('href') ||
        ''
      const price = $(el).parent().parent().find('.money').first().text() || ''

      return { name, image, url, price }
    })
    .get()
}

const getSpecialReserveGames = (webpage: string, baseUrl: string): Game[] => {
  const $ = cheerio.load(webpage)
  const gamesSelector = $(
    '.card-wrapper :has(.card-figure > a > .card-img-container > .card-image[alt$="[SWITCH SINGLE]"])'
  )

  return gamesSelector
    .map((_i, el) => {
      const imageSelector = $(el)
        .find(
          '.card-figure > a > .card-img-container > .card-image[alt$="[SWITCH SINGLE]"]'
        )
        .first()
      const name = imageSelector.attr('alt') || ''
      const image = imageSelector.attr('data-src') || ''
      const url = $(el).find('a').first().attr('href') || ''
      const price =
        $(el).parent().parent().find('.price--main').first().text() || ''

      return { name, image, url, price }
    })
    .get()
}

const getSpecialReserveGamesResponses = async () => {
  const firstPageResponse = await fetch(sites.specialReserveGames.url)
  const secondPageResponse = await fetch(
    `${sites.specialReserveGames.url}/?sort=featured&page=2&limit=12`
  )

  return { firstPageResponse, secondPageResponse }
}

const getSpecialReserveGamesTexts = async (
  firstPage: Response,
  secondPage: Response
) => {
  const firstPageText = await firstPage.text()
  const secondPageText = await secondPage.text()

  return { firstPageText, secondPageText }
}

export default function Home({ data }: PageProps<GameStores>) {
  if (!data) {
    return <h1>Page not found</h1>
  }
  return (
    <div>
      <nav id='header' class='w-full z-30 top-0 py-1'>
        <div class='w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-6 py-3'>
          <div
            class='hidden md:flex md:items-center md:w-auto w-full order-3 md:order-1'
            id='menu'
          >
            <nav>
              <ul class='md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0'>
                <li>
                  <a
                    class='inline-block no-underline hover:text-black hover:underline py-2 px-4'
                    href='/'
                  >
                    Games
                  </a>
                </li>
                <li>
                  <a
                    class='inline-block no-underline hover:text-black hover:underline py-2 px-4'
                    href='/about'
                  >
                    About
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div class='order-1 md:order-2'>
            <a
              class='flex items-center tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl '
              href=''
            >
              🔮 Game Orb
            </a>
          </div>

          <div class='order-2 md:order-3 flex items-center' id='nav-content'>
            <a class='inline-block no-underline hover:text-black' href='#'>
              &nbsp;
            </a>
            <a class='pl-3 inline-block no-underline hover:text-black' href='#'>
              &nbsp;
            </a>
          </div>
        </div>
      </nav>
      <section class='bg-white py-8'>
        <div class='container mx-auto flex items-center flex-wrap pt-4 pb-12'>
          <nav class='w-full z-30 top-0 px-6 py-1'>
            <div class='w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3'>
              <a
                class='uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl '
                href='#'
              >
                Super Rare Games
              </a>

              <div class='flex items-center' id='store-nav-content'>
                <a
                  class='pl-3 inline-block no-underline hover:text-black'
                  href='#'
                >
                  &nbsp;
                </a>

                <a
                  class='pl-3 inline-block no-underline hover:text-black'
                  href='#'
                >
                  &nbsp;
                </a>
              </div>
            </div>
          </nav>

          {data.superRareGames.map((game) => (
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

          <nav class='w-full z-30 top-0 px-6 py-1'>
            <div class='w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3'>
              <a
                class='uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl '
                href='#'
              >
                Special Reserve Games
              </a>

              <div class='flex items-center' id='store-nav-content'>
                <a
                  class='pl-3 inline-block no-underline hover:text-black'
                  href='#'
                >
                  &nbsp;
                </a>

                <a
                  class='pl-3 inline-block no-underline hover:text-black'
                  href='#'
                >
                  &nbsp;
                </a>
              </div>
            </div>
          </nav>
          {data.specialReserveGames.map((game) => (
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
      </section>

      <footer class='text-gray-100'>
        <div class='container px-5 py-8 mx-auto flex flex-col items-center space-y-4'>
          <a href='https://fresh.deno.dev'>
            <img
              width='197'
              height='37'
              src='https://fresh.deno.dev/fresh-badge-dark.svg'
              alt='Made with Fresh'
            />
          </a>
        </div>
      </footer>
    </div>
  )
}
