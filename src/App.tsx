import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './components/layout/header/Header';
import SBtcImg from '/src/assets/img/sbtc.png';

const Home = lazy(() => import('./components/home/Home'));
const Swap = lazy(() => import('./components/swap/Swap'));

import './App.css';

const Loading = () => {
  return (
    <div className="flex flex-grow items-center justify-center">
      <img className="m-auto object-scale-down h-96 w-96" src={SBtcImg} alt="sBTC" />
    </div >
  )
}
function App() {
  // set theme as system setting
  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }, []);

  return (
    <Router>
      <div className="App backdrop-blur-[96px] min-h-[100vh] text-special-black dark:text-white transition-all duration-500 overflow-hidden relative flex flex-col">
        <Header />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/swaps/:id" element={<Swap />} />
            <Route path="/swaps" element={<Swap />} />
          </Routes>
        </Suspense>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
