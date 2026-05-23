import {
  Sparklines,
  SparklinesLine,
} from "react-sparklines";

const MarketOverview = ({ coins = [] }) => {
  const gainers = [...coins]
    .sort(
      (a, b) =>
        b.price_change_percentage_24h -
        a.price_change_percentage_24h
    )
    .slice(0, 3);

  const losers = [...coins]
    .sort(
      (a, b) =>
        a.price_change_percentage_24h -
        b.price_change_percentage_24h
    )
    .slice(0, 3);

  

  return (
    <div className="overview-grid">
      {/* LEFT CARD */}
      <div className="market-card">
        {/* GAINERS */}
        <div className="market-side">
          <h3>📈 Top Gainers</h3>

          {gainers.map((coin) => (
            <div key={coin.id} className="market-row">
              {/* COIN INFO */}
              <div className="market-coin-info">
                <img
                  src={coin.image}
                  alt={coin.name}
                  className="market-coin-image"
                />

                <div>
                  <h4>
                    {coin.symbol.toUpperCase()}
                  </h4>
                  <p>{coin.name}</p>
                </div>
              </div>

              {/* MINI GRAPH */}
              <div className="market-mini-chart">
                <Sparklines
                  data={[
                    coin.current_price * 0.92,
                    coin.current_price * 0.95,
                    coin.current_price * 0.97,
                    coin.current_price,
                  ]}
                >
                  <SparklinesLine
                    color="#22c55e"
                    style={{
                      strokeWidth: 3,
                      fill: "none",
                    }}
                  />
                </Sparklines>
              </div>

              {/* CHANGE */}
              <span className="green">
                ▲{" "}
                {coin.price_change_percentage_24h.toFixed(
                  2
                )}
                %
              </span>
            </div>
          ))}
        </div>

        {/* DIVIDER */}
        <div className="vertical-divider"></div>

        {/* LOSERS */}
        <div className="market-side">
          <h3>📉 Top Losers</h3>

          {losers.map((coin) => (
            <div key={coin.id} className="market-row">
              {/* COIN INFO */}
              <div className="market-coin-info">
                <img
                  src={coin.image}
                  alt={coin.name}
                  className="market-coin-image"
                />

                <div>
                  <h4>
                    {coin.symbol.toUpperCase()}
                  </h4>
                  <p>{coin.name}</p>
                </div>
              </div>

              {/* MINI GRAPH */}
              <div className="market-mini-chart">
                <Sparklines
                  data={[
                    coin.current_price * 1.08,
                    coin.current_price * 1.05,
                    coin.current_price * 1.02,
                    coin.current_price,
                  ]}
                >
                  <SparklinesLine
                    color="#ef4444"
                    style={{
                      strokeWidth: 3,
                      fill: "none",
                    }}
                  />
                </Sparklines>
              </div>

              {/* CHANGE */}
              <span className="red">
                ▼{" "}
                {coin.price_change_percentage_24h.toFixed(
                  2
                )}
                %
              </span>
            </div>
          ))}
        </div>
      </div>

     
    </div>
  );
};

export default MarketOverview;