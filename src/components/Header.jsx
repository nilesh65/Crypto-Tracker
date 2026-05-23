import { Link } from "react-router";

const Header = ({ coins = [] }) => {
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
          {[...coins.slice(0, 15), ...coins.slice(0, 15)].map((coin, index) => (
            <div className="ticker-item" key={`${coin.id}-${index}`}>
  <img src={coin.image} alt={coin.name} />

  <span className="ticker-symbol">
    {coin.symbol.toUpperCase()}
  </span>

  <span className="ticker-price">
    ${coin.current_price.toLocaleString()}
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