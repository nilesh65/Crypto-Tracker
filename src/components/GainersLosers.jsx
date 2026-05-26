import { Sparklines, SparklinesLine } from "react-sparklines";

const GainersLosers = ({ coins = [] }) => {
  const gainers = [...coins]
    .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
    .slice(0, 6);

  const losers = [...coins]
    .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
    .slice(0, 6);

  return (
    <div className="market-card">
      <div className="market-side">
        <h3>📈 Top Gainers</h3>
        {gainers.map((coin) => (
          <div key={coin.id} className="market-row">
            <div className="market-coin-info">
              <img src={coin.image} className="market-coin-image" alt={coin.name} />
              <div>
                <h4>{coin.symbol.toUpperCase()}</h4>
                <p>{coin.name}</p>
              </div>
            </div>

            <div className="market-mini-chart">
              <Sparklines data={coin.sparkline_in_7d?.price || []}>
                <SparklinesLine color="#22c55e" style={{ strokeWidth: 2, fill: "none" }} />
              </Sparklines>
            </div>

            <span className="green">
              ▲ {(coin.price_change_percentage_24h || 0).toFixed(2)}%
            </span>
          </div>
        ))}
      </div>

      <div className="vertical-divider"></div>

      <div className="market-side">
        <h3>📉 Top Losers</h3>
        {losers.map((coin) => (
          <div key={coin.id} className="market-row">
            <div className="market-coin-info">
              <img src={coin.image} className="market-coin-image" alt={coin.name} />
              <div>
                <h4>{coin.symbol.toUpperCase()}</h4>
                <p>{coin.name}</p>
              </div>
            </div>

            <div className="market-mini-chart">
              <Sparklines data={coin.sparkline_in_7d?.price || []}>
                <SparklinesLine color="#ef4444" style={{ strokeWidth: 2, fill: "none" }} />
              </Sparklines>
            </div>

            <span className="red">
              ▼ {Math.abs(coin.price_change_percentage_24h || 0).toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GainersLosers;