import CoinCard from "../components/CoinCard";
import LimitSelector from "../components/LimitSelector";
import FilterInput from "../components/FilterInput";
import SortSelector from "../components/SortSelector";
import Spinner from "../components/Spinner";
import SkeletonCard from "../components/Skeleton";

const HomePage = ({
  coins,
  filter,
  setFilter,
  limit,
  setLimit,
  sortBy,
  setSortBy,
  loading,
  error,
}) => {
  const filteredCoins = [...coins]
    .filter((coin) => {
      const name = coin.name?.toLowerCase() || "";
      const symbol = coin.symbol?.toLowerCase() || "";
      const search = filter.toLowerCase();

      return name.includes(search) || symbol.includes(search);
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "market_cap_desc":
          return b.market_cap - a.market_cap;

        case "market_cap_asc":
          return a.market_cap - b.market_cap;

        case "price_desc":
          return b.current_price - a.current_price;

        case "price_asc":
          return a.current_price - b.current_price;

        case "change_desc":
          return (
            b.price_change_percentage_24h -
            a.price_change_percentage_24h
          );

        case "change_asc":
          return (
            a.price_change_percentage_24h -
            b.price_change_percentage_24h
          );

        default:
          return 0;
      }
    });

  return (
    <div>
    {loading && (
  <main className="grid">
    {Array.from({ length: limit }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </main>
)}
      {error && <div className="error">{error}</div>}

      <div className="top-controls">
        <FilterInput filter={filter} onFilterChange={setFilter} />
        <LimitSelector limit={limit} onLimitChange={setLimit} />
        <SortSelector sortBy={sortBy} onSortChange={setSortBy} />
      </div>

      {!loading && !error && (
        <main className="grid">
          {filteredCoins.length > 0 ? (
            filteredCoins.map((coin) => (
              <CoinCard key={coin.id} coin={coin} />
            ))
          ) : (
            <p>No matching coins</p>
          )}
        </main>
      )}
    </div>
  );
};

export default HomePage;