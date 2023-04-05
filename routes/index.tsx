import Games from "../islands/Games.tsx";

const sites = {
  superRareGames: {
    name: 'Super Rare Games',
    siteUrl: 'https://superraregames.com',
    apiUrl: 'api/superrare'
  },
  limitedRunGames: {
    name: 'Limited Run Games',
    siteUrl: 'https://limitedrungames.com',
    apiUrl: 'https://limitedrungames.com/collections/nintendo-switch-games'
  },
  specialReserveGames: {
    name: 'Special Reserve Games',
    siteUrl: 'https://specialreservegames.com',
    apiUrl: 'api/specialreserve'
  }
}

export default function Home() {
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
          <div>
            
          </div>
          <nav class='w-full z-30 top-0 px-6 py-1'>
            <div class='w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3'>
              <a
                class='uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl '
                href={sites.superRareGames.siteUrl}
              >
                Super Rare Games
              </a>
            </div>
          </nav>

          <Games url={sites.superRareGames.apiUrl} />

          <nav class='w-full z-30 top-0 px-6 py-1'>
            <div class='w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3'>
              <a
                class='uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl '
                href={sites.specialReserveGames.siteUrl}
              >
                Special Reserve Games
              </a>
            </div>
          </nav>
          <Games url={sites.specialReserveGames.apiUrl} />
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
