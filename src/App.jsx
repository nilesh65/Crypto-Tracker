import { useState, useEffect } from "react";
import HomePage from "./pages/home";
import { Routes, Route } from "react-router";
import AboutPage from "./pages/about";
import Header from "./components/Header";
import NotFoundPage from "./pages/not-found";
import CoinDetailsPage from "./pages/coin-details";
import MarketOverview from "./components/MarketOverview";

const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("market_cap_desc");

  useEffect(() => {
    const controller = new AbortController();

    const fetchCoins = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=true`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error("You have maid too many requests that's why Coin Gecko API rate limit has been hit. try after 1 min again as free version has limits");

        const data = await res.json();
        setCoins(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();

    return () => controller.abort();
  }, [limit]);

  return (
    <>
      <Header coins={coins} />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <MarketOverview coins={coins} />

              <HomePage
                coins={coins}
                filter={filter}
                setFilter={setFilter}
                limit={limit}
                setLimit={setLimit}
                sortBy={sortBy}
                setSortBy={setSortBy}
                loading={loading}
                error={error}
              />
            </>
          }
        />

        <Route path="/about" element={<AboutPage />} />
        <Route path="/coin/:id" element={<CoinDetailsPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;