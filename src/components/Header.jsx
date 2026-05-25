import { Link } from "react-router";

const Header = ({ coins = [] }) => {
  const tickerCoins = coins.slice(0, 15);

  return (
    <>
      <header className="navbar">
        <div className="navbar-left">
          <img
            src="/cryptocurrency.ico"
            alt="logo"
            className="navbar-logo"
          />
          <h2>CryptoTracker</h2>
        </div>

        <nav className="navbar-right">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>
      </header>

      <div className="ticker-wrapper">
        <div className="ticker">
          {[...tickerCoins, ...tickerCoins].map((coin, i) => (
  <div className="ticker-item" key={`${coin.id}-${i}`}>
              <img src={coin.image} alt={coin.name} />

              <span className="ticker-symbol">
                {coin.symbol?.toUpperCase()}
              </span>

              <span className="ticker-price">
                ${coin.current_price?.toLocaleString() ?? "0"}
              </span>

              <span
                className={
                  coin.price_change_percentage_24h >= 0
                    ? "ticker-positive"
                    : "ticker-negative"
                }
              >
                {coin.price_change_percentage_24h >= 0 ? "▲" : "▼"}{" "}
                {Math.abs(
                  coin.price_change_percentage_24h ?? 0
                ).toFixed(2)}
                %
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Header;