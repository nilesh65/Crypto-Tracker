import { useState,useEffect } from "react";
import HomePage from "./pages/home";
import  {Routes, Route} from 'react-router';
import AboutPage from "./pages/about";
import Header from "./components/Header";
import NotFoundPage from "./pages/not-found";
import CoinDetails from "./pages/coin-details";
import CoinDetailsPage from "./pages/coin-details";

import MarketOverview from "./components/MarketOverview";

const API_URL = import.meta.env.VITE_API_URL
const App = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('market_cap_desc');
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch(`${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=true`)
        if(!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();
        // console.log(data);
        setCoins(data);
      } catch (error) {
        setError(error.message);
      }
      finally{
        setLoading(false);
      }
    }
    fetchCoins();
  },[limit])

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
      <Route path="/*" element={<NotFoundPage />} />
      <Route path="/coin/:id" element={<CoinDetailsPage/>}/>
    </Routes>
    </>
   );
}

export default App;