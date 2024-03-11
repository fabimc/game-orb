export default function GameSkeleton() {
  return (
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
  )
}
