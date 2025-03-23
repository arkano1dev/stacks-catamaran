import React from 'react';
import { Link, useNavigation, useParams, useRoutes } from 'react-router-dom';



const Home = () => {
    const pathname = window.location.pathname;
    return (
        <div className="w-full flex justify-center">
            <div className="w-full max-w-[1440px] flex justify-center px-6 sm:px-20">
                <div className="max-w-[590px] w-full mg-18 sm:mt-24 flex flex-col gap-5">
                    <div className="w-full flex-col justify-center items-center">
                        <p className='text-center'>Page {pathname} does not exist</p>
                        <div className="flex-1 flex justify-center my-10">
                            <img src='/404.png' alt='404' />
                        </div>
                        <Link className={`m-4 flex-1 flex items-center justify-center py-2 bg-[rgba(7,7,10,0.07)] dark:bg-[#14151A]
      rounded-2xl text-base font-normal`}
                            to="/swaps">Visit Home page</Link>
                        <Link className={`m-4 flex-1 flex items-center justify-center py-2 bg-[rgba(7,7,10,0.07)] dark:bg-[#14151A]
      rounded-2xl text-base font-normal`}
                            to="/swaps">Create a new swap</Link>
                        <Link className={`m-4 flex-1 flex items-center justify-center py-2 bg-[rgba(7,7,10,0.07)] dark:bg-[#14151A]
        rounded-2xl text-base font-normal`}
                            to="/recent">See recent swaps</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
