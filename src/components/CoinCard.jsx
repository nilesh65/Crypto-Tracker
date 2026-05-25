import { Link } from "react-router"
const CoinCard = ({ coin }) => {
  const priceChange = coin?.price_change_percentage_24h ?? 0;

  return (
    <Link to={`/coin/${coin.id}`}>
      <div className="coin-card">
        
        <div className="coin-header">
          <img
            src={coin?.image}
            alt={coin?.name}
            className="coin-image"
          />

          <div>
            <h2>{coin?.name}</h2>
            <p className="symbol">
              {coin?.symbol?.toUpperCase() || ""}
            </p>
          </div>
        </div>

        <p>
          Price: ${coin?.current_price?.toLocaleString() || "0"}
        </p>

        <p className={priceChange >= 0 ? "positive" : "negative"}>
          {priceChange.toFixed(2)} %
        </p>

        <p>
          Market Cap: {coin?.market_cap?.toLocaleString() || "0"}
        </p>

      </div>
    </Link>
  );
};

export default CoinCard;