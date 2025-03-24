
import Faq from './faq/Faq';
import LandingView from './landing-view/LandingView';
import SwapFlow from './swap-flow/SwapFlow';
import { btcPriceUsd } from './../../lib/prices';
const Home = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[1440px] px-6 sm:px-20">
        <LandingView />
        <SwapFlow btcPriceUsd={btcPriceUsd} />
        <Faq />
      </div>
    </div>
  );
};

export default Home;
