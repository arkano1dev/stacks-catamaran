import { lazy, Suspense, useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Header from './components/layout/header/Header';
import SBtcImg from '/src/assets/img/sbtc.png';

const Home = lazy(() => import('./components/home/Home'));
const Swap = lazy(() => import('./components/swap/Swap'));
const NotFound = lazy(() => import('./components/notFound/NotFound'));

const Loading = () => {
  return (
    <div className="flex flex-grow items-center justify-center">
      <img className="m-auto object-scale-down h-96 w-96" src={SBtcImg} alt="sBTC" />
    </div >
  )
}
function App() {

  const params = new URLSearchParams(window.location.search);
  const chain = params.get('chain');

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
        <Header chain={chain || ""} />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/swaps" element={<Swap />} />
            <Route path="/swaps/:id" element={<Swap />} />
            <Route path="/recent" element={<Swap />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
