import { Link } from "react-router-dom"

export const NoSwapFound = ({ id }: { id: string | undefined }) => {
    return <div className="w-full flex-col justify-center items-center">
        <p className='text-center'>Catamaran Swap #{id} not found.</p>
        <div className="flex-1 flex justify-center my-10">
            <img src='/404.png' alt='404' />
        </div>
        <Link className={`m-4 flex-1 flex items-center justify-center py-2 bg-[rgba(7,7,10,0.07)] dark:bg-[#14151A]
      rounded-2xl text-base font-normal`}
            to="/swaps">Create a new swap!</Link>
        <Link className={`m-4 flex-1 flex items-center justify-center py-2 bg-[rgba(7,7,10,0.07)] dark:bg-[#14151A]
        rounded-2xl text-base font-normal`}
            to="/recent">See recent swaps!</Link>
    </div>
}