import GainersLosers from "./GainersLosers";
import Watchlist from "./Watchlist";

const MarketOverview = ({ coins = [] }) => {
  return (
    <div className="overview-grid">
      <GainersLosers coins={coins} />
      <Watchlist coins={coins} />
    </div>
  );
};

export default MarketOverview;