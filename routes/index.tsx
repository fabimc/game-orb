import Games from '../islands/Games.tsx'

export default function Home() {
  return (
    <div class='bg-white text-gray-600 work-sans leading-normal text-base tracking-normal'>
      <nav id='header' class='w-full z-30 top-0 py-1'>
        <div class='w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-6 py-3'>
          <div class='hidden md:flex md:items-center md:w-auto w-full order-3 md:order-1' id='menu'></div>

          <div class='order-1 md:order-2'>
            <a class='flex items-center tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl ' href='#'>
              🔮 Game Orb
            </a>
          </div>

          <div class='order-2 md:order-3 flex items-center' id='nav-content'></div>
        </div>
      </nav>

      <section class='bg-white py-8'>
        <div class='container mx-auto flex items-center flex-wrap pt-4 pb-12'>
          <nav id='store' class='w-full z-30 top-0 px-6 py-1'>
            <div class='w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3'>
              <a class='uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl ' href='https://superraregames.com'>
                Super Rare Games
              </a>
            </div>
          </nav>
          <Games brand='superrare' />
        </div>

        <div class='container mx-auto flex items-center flex-wrap pt-4 pb-12'>
          <nav id='store' class='w-full z-30 top-0 px-6 py-1'>
            <div class='w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3'>
              <a class='uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl ' href='https://limitedrungames.com'>
                Limited Run Games
              </a>
            </div>
          </nav>
          <Games brand='limitedrun' />
        </div>

        <div class='container mx-auto flex items-center flex-wrap pt-4 pb-12'>
          <nav id='store' class='w-full z-30 top-0 px-6 py-1'>
            <div class='w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3'>
              <a class='uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl ' href='https://limitedrungames.com'>
                Strictly Limited Games
              </a>
            </div>
          </nav>
          <Games brand='strictlylimited' />
        </div>
      </section>

      <footer class='container mx-auto bg-white py-8 border-t border-gray-400'>
        <div class='container flex px-3 py-8 '>
          <div class='w-full mx-auto flex flex-wrap'>
            <div class='flex w-full lg:w-1/2 '>
              <div class='px-3 md:px-0'>
                <h3 class='font-bold text-gray-900'>About</h3>
                <p class='py-4'>This site simply scraps websites' public shops and groups them by Switch "single" games (no steelbooks or CEs).</p>
              </div>
            </div>
            <div class='flex w-full lg:w-1/2 lg:justify-end lg:text-right mt-6 md:mt-0'>
              <div class='px-3 md:px-0'>
                <h3 class='text-left font-bold text-gray-900'></h3>

                <div class='w-full flex items-center py-4 mt-0'>
                  <a href='https://fresh.deno.dev'>
                    <img width='197' height='37' src='https://fresh.deno.dev/fresh-badge.svg' alt='Made with Fresh' />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
