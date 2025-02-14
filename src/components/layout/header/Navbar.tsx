import React from 'react';
import { Link } from 'react-router-dom';

import ConnectWallet from '../../common/ConnectWallet';
import ThemeSelector from '../../common/ThemeSelector';

import CloseImg from '/src/assets/img/close.svg?react';

const Navbar = ({
  navbarVisible,
  setNavbarVisible,
  chain
}: {
  navbarVisible: boolean;
  setNavbarVisible: React.Dispatch<React.SetStateAction<boolean>>;
  chain: string;
}) => {
  const closeNavbar = () => setNavbarVisible(false);

  return (
    <div
      className={`sm:hidden overflow-hidden fixed z-10 top-0 right-0 ${navbarVisible === true ? 'w-full' : 'w-0'
        }  h-[100vh] bg-white dark:bg-black transition-[width] duration-500`}
    >
      <div className="w-full h-20 px-5 flex justify-end items-center">
        <button onClick={closeNavbar}>
          <CloseImg className="w-6 h-6 dark:stroke-white stroke-special-black" />
        </button>
      </div>
      <div className="justify-center px-8 flex flex-col gap-6">
        <Link to="/swaps" className="text-base font-normal leading-6" onClick={closeNavbar}>
          Swaps
        </Link>
        <Link to="/documentation" className="text-base font-normal leading-6" onClick={closeNavbar}>
          Documentation
        </Link>
        <div className="w-full justify-center items-center flex gap-3">
          <ThemeSelector />
          <ConnectWallet chain={chain} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
