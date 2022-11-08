import { Handlers, PageProps } from '$fresh/server.ts'
import { cheerio } from "https://deno.land/x/denocheerio@1.0.0/mod.ts"

interface Game {
  image: string
  name: string
  price: string
  url: string
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
  }
}

export const handler: Handlers<Game[]> = {
  async GET(_, ctx) {
    const superRareGamesResponse = await fetch(sites.superRareGames.url)

    if (superRareGamesResponse.status === 404) {
      return ctx.render([])
    }

    const superRareGamesText = await superRareGamesResponse.text()

    const superRareGames = getSuperRareGames(
      superRareGamesText,
      sites.superRareGames.baseUrl
    )

    return ctx.render(superRareGames)
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
      const url = baseUrl + $(el).find('.img-wrap > .img-container > a').first().attr('href') || ''
      const price = $(el).parent().parent().find('.money').first().text() || ''

      return { name, image, url, price }
    })
    .get()
}

export default function Home({ data }: PageProps<Game[]>) {
  if (!data) {
    return <h1>Page not found</h1>
  }
  return (
    <div>
      <nav id="header" class="w-full z-30 top-0 py-1">
        <div class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-6 py-3">
          <label for="menu-toggle" class="cursor-pointer md:hidden block">
            <svg
              class="fill-current text-gray-900"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
            >
              <title>menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </label>
          <input class="hidden" type="checkbox" id="menu-toggle" />

          <div
            class="hidden md:flex md:items-center md:w-auto w-full order-3 md:order-1"
            id="menu"
          >
            <nav>
              <ul class="md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0">
                <li>
                  <a
                    class="inline-block no-underline hover:text-black hover:underline py-2 px-4"
                    href="/about"
                  >
                    About
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div class="order-1 md:order-2">
            <a
              class="flex items-center tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl "
              href=""
            >
              <svg
                class="fill-current text-gray-800 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M5,22h14c1.103,0,2-0.897,2-2V9c0-0.553-0.447-1-1-1h-3V7c0-2.757-2.243-5-5-5S7,4.243,7,7v1H4C3.447,8,3,8.447,3,9v11 C3,21.103,3.897,22,5,22z M9,7c0-1.654,1.346-3,3-3s3,1.346,3,3v1H9V7z M5,10h2v2h2v-2h6v2h2v-2h2l0.002,10H5V10z" />
              </svg>
              Game Orb
            </a>
          </div>

          <div class="order-2 md:order-3 flex items-center" id="nav-content">
            <a class="inline-block no-underline hover:text-black" href="#">
              &nbsp;
            </a>
            <a class="pl-3 inline-block no-underline hover:text-black" href="#">
              &nbsp;
            </a>
          </div>
        </div>
      </nav>
      <section class="bg-white py-8">
        <div class="container mx-auto flex items-center flex-wrap pt-4 pb-12">
          <nav id="store" class="w-full z-30 top-0 px-6 py-1">
            <div class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">
              <a
                class="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl "
                href="#"
              >
                Super Rare Games
              </a>

              <div class="flex items-center" id="store-nav-content">
                <a
                  class="pl-3 inline-block no-underline hover:text-black"
                  href="#"
                >
                  &nbsp;
                </a>

                <a
                  class="pl-3 inline-block no-underline hover:text-black"
                  href="#"
                >
                  &nbsp;
                </a>
              </div>
            </div>
          </nav>

          {data.map((game) => (
            <div class="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
              <a href={game.url}>
                <img class="hover:shadow-lg" src={game.image} />
                <div class="pt-3 flex items-center justify-between">
                  <p class="">{game.name}</p>
                  {/* <svg
                class="h-6 w-6 fill-current text-gray-500 hover:text-black"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12,4.595c-1.104-1.006-2.512-1.558-3.996-1.558c-1.578,0-3.072,0.623-4.213,1.758c-2.353,2.363-2.352,6.059,0.002,8.412 l7.332,7.332c0.17,0.299,0.498,0.492,0.875,0.492c0.322,0,0.609-0.163,0.792-0.409l7.415-7.415 c2.354-2.354,2.354-6.049-0.002-8.416c-1.137-1.131-2.631-1.754-4.209-1.754C14.513,3.037,13.104,3.589,12,4.595z M18.791,6.205 c1.563,1.571,1.564,4.025,0.002,5.588L12,18.586l-6.793-6.793C3.645,10.23,3.646,7.776,5.205,6.209 c0.76-0.756,1.754-1.172,2.799-1.172s2.035,0.416,2.789,1.17l0.5,0.5c0.391,0.391,1.023,0.391,1.414,0l0.5-0.5 C14.719,4.698,17.281,4.702,18.791,6.205z" />
              </svg> */}
                </div>
                <p class="pt-1 text-gray-900">{game.price}</p>
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
