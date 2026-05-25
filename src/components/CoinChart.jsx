import { useState, useEffect, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
  Filler
} from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
  TimeScale
);

const API_URL = import.meta.env.VITE_COIN_API_URL;

const RANGES = [
  { label: '1D',  days: 1   },
  { label: '7D',  days: 7   },
  { label: '1M',  days: 30  },
  { label: '3M',  days: 90  },
  { label: '6M',  days: 180 },
  { label: '1Y',  days: 365 },
];

const CoinChart = ({ coinId }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDays, setSelectedDays] = useState(7);

  useEffect(() => {
    const controller = new AbortController();

    const fetchPrices = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `${API_URL}/${coinId}/market_chart?vs_currency=usd&days=${selectedDays}`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error("You have maid too many requests that's why Coin Gecko API rate limit has been hit. try after 1 min again as free version has limits");

        const data = await res.json();

        const prices = (data.prices || []).map((price) => ({
          x: price[0],
          y: price[1],
        }));

        setChartData({
          datasets: [
            {
              label: 'Price (USD)',
              data: prices,
              fill: true,
              borderColor: '#3b82f6',
              backgroundColor: 'rgba(59, 130, 246, 0.08)',
              pointRadius: 0,
              tension: 0.3,
            },
          ],
        });
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
          setError("You have maid too many requests that's why Coin Gecko API rate limit has been hit. try after 1 min again as free version has limits");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();

    return () => controller.abort();
  }, [coinId, selectedDays]);

  const timeUnit = useMemo(() => {
    if (selectedDays === 1)   return 'hour';
    if (selectedDays <= 30)   return 'day';
    return 'month';
  }, [selectedDays]);

  const options = useMemo(() => ({
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { mode: 'index', intersect: false },
    },
    scales: {
      x: {
        type: 'time',
        time: { unit: timeUnit },
        ticks: { autoSkip: true, maxTicksLimit: 8 },
      },
      y: {
        ticks: {
          callback: (value) => `$${value.toLocaleString()}`,
        },
      },
    },
  }), [timeUnit]);

  return (
    <div style={{ marginTop: '30px' }}>

      {/* Range Selector */}
      <div className="chart-range-selector">
        {RANGES.map((range) => (
          <button
            key={range.days}
            className={`chart-range-btn ${selectedDays === range.days ? 'active' : ''}`}
            onClick={() => setSelectedDays(range.days)}
          >
            {range.label}
          </button>
        ))}
      </div>

      {/* Chart */}
      {loading && <p className="chart-status">Loading chart...</p>}
      {error  && <p className="chart-status chart-error">{error}</p>}
      {!loading && !error && chartData && (
        <Line data={chartData} options={options} />
      )}

    </div>
  );
};

export default CoinChart;