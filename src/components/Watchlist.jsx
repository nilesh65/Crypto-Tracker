import { useState, useEffect, useRef } from "react";
import { Pencil, Trash2 } from "lucide-react";

const Watchlist = ({ coins = [] }) => {
  const [watchlists, setWatchlists] = useState(() => {
  try {
    const stored = localStorage.getItem("crypto-watchlists");
    if (!stored) return [];

    const parsed = JSON.parse(stored);

    return parsed.map((list) => ({
      ...list,
      coins: list.coins.map((c) =>
        typeof c === "string" ? c : c.id  
      ),
    }));
  } catch {
    return [];
  }
});

  const [showSearch, setShowSearch] = useState({});
  const [editingWatchlistId, setEditingWatchlistId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [newWatchlistName, setNewWatchlistName] = useState("");
  const [showCreateInput, setShowCreateInput] = useState(false);
  const [selectedWatchlistId, setSelectedWatchlistId] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchInputs, setSearchInputs] = useState({});
  const dropdownRef = useRef(null);

  // Persist watchlists to localStorage
  useEffect(() => {
    localStorage.setItem("crypto-watchlists", JSON.stringify(watchlists));
  }, [watchlists]);

  // Auto-select first watchlist
  useEffect(() => {
    if (watchlists.length > 0 && !selectedWatchlistId) {
      setSelectedWatchlistId(watchlists[0].id);
    }
  }, [watchlists]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const createWatchlist = () => {
    if (!newWatchlistName.trim()) return;
    if (watchlists.length >= 5) return alert("Max 5 watchlists");

    const newList = { id: Date.now(), name: newWatchlistName, coins: [] };
    setWatchlists([...watchlists, newList]);
    setSelectedWatchlistId(newList.id);
    setNewWatchlistName("");
    setShowCreateInput(false);
  };

  const deleteWatchlist = (watchlistId) => {
    const updated = watchlists.filter((w) => w.id !== watchlistId);
    setWatchlists(updated);
    setSelectedWatchlistId(updated.length > 0 ? updated[0].id : null);
  };

  const startEditing = (list) => {
    setEditingWatchlistId(list.id);
    setEditedName(list.name);
  };

  const saveWatchlistName = (watchlistId) => {
    if (!editedName.trim()) return;
    setWatchlists((prev) =>
      prev.map((list) =>
        list.id === watchlistId ? { ...list, name: editedName } : list
      )
    );
    setEditingWatchlistId(null);
    setEditedName("");
  };

  const addCoinToWatchlist = (watchlistId, coin) => {
  const updated = watchlists.map((list) => {
    if (list.id !== watchlistId) return list;
    if (list.coins.length >= 3) { alert("Max 3 coins allowed"); return list; }
    if (list.coins.includes(coin.id)) return list; // ← just check id
    return { ...list, coins: [...list.coins, coin.id] }; // ← store only id
  });

  setWatchlists(updated);
  setSearchInputs((prev) => ({ ...prev, [watchlistId]: "" }));
  setShowSearch((prev) => ({ ...prev, [watchlistId]: false }));
};

  const removeCoin = (watchlistId, coinId) => {
  setWatchlists((prev) =>
    prev.map((list) =>
      list.id === watchlistId
        ? { ...list, coins: list.coins.filter((id) => id !== coinId) } // ← filter ids
        : list
    )
  );
};

  return (
    <div className="news-card">
      {/* Header */}
      <div className="watchlist-header">
        <h3>⭐ Watchlists</h3>
        {watchlists.length < 5 && !showCreateInput && (
          <button className="create-watchlist-btn" onClick={() => setShowCreateInput(true)}>
            Create New
          </button>
        )}
      </div>

      {/* Create Input */}
      {showCreateInput && (
        <div className="watchlist-create-row">
          <input
            value={newWatchlistName}
            onChange={(e) => setNewWatchlistName(e.target.value)}
            placeholder="Watchlist name"
          />
          <button className="add-watchlist-btn" onClick={createWatchlist}>+</button>
        </div>
      )}

      {/* Custom Dropdown Selector */}
      {watchlists.length > 1 && (
        <div className="custom-select-wrapper" ref={dropdownRef}>
          <button
            className="custom-select-trigger"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            {watchlists.find((w) => w.id === selectedWatchlistId)?.name || "Select"}
            <span className="custom-select-arrow">{dropdownOpen ? "▲" : "▼"}</span>
          </button>

          {dropdownOpen && (
            <ul className="custom-select-options">
              {watchlists.map((w) => (
                <li
                  key={w.id}
                  className={`custom-select-option ${w.id === selectedWatchlistId ? "active" : ""}`}
                  onClick={() => { setSelectedWatchlistId(w.id); setDropdownOpen(false); }}
                >
                  {w.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Watchlist Content */}
      {watchlists
        .filter((w) => w.id === selectedWatchlistId)
        .map((list) => {
          const search = searchInputs[list.id] || "";
          const filteredCoins = coins
            .filter(
              (coin) =>
                coin.name.toLowerCase().includes(search.toLowerCase()) ||
                coin.symbol.toLowerCase().includes(search.toLowerCase())
            )
            .slice(0, 6);

          return (
            <div key={list.id} className="watchlist-box">
              {/* Title Row */}
              <div className="watchlist-title-row">
                {editingWatchlistId === list.id ? (
                  <div className="edit-watchlist-row">
                    <input
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="watchlist-edit-input"
                    />
                    <button className="save-watchlist-btn" onClick={() => saveWatchlistName(list.id)}>
                      Save
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="watchlist-big-title">{list.name}</h2>
                    <div className="watchlist-actions">
                      <button className="icon-btn" onClick={() => startEditing(list)}>
                        <Pencil size={18} />
                      </button>
                      <button className="icon-btn delete" onClick={() => deleteWatchlist(list.id)}>
                        <Trash2 size={18} />
                      </button>
                      {list.coins.length < 3 && (
                        <button
                          className="add-new-stock-btn"
                          onClick={() =>
                            setShowSearch((prev) => ({ ...prev, [list.id]: !prev[list.id] }))
                          }
                        >
                          + Add Coin
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Search Input */}
              {showSearch[list.id] && list.coins.length < 3 && (
                <input
                  className="watchlist-search"
                  placeholder="Search coin..."
                  value={search}
                  onChange={(e) =>
                    setSearchInputs({ ...searchInputs, [list.id]: e.target.value })
                  }
                />
              )}

              {/* Search Results */}
              {search.length > 0 && list.coins.length < 3 && (
                <div className="search-results">
                  {filteredCoins.map((coin) => (
                    <div
                      key={coin.id}
                      className="search-item"
                      onClick={() => addCoinToWatchlist(list.id, coin)}
                    >
                      <img src={coin.image} className="search-coin-image" alt={coin.name} />
                      <span>{coin.symbol.toUpperCase()} - {coin.name}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Coins */}
              <div className="watchlist-coins">
                {list.coins.length === 0 ? (
                  <p className="empty-watchlist-coins">No coins added</p>
                ) : (
                  list.coins
  .map((id) => coins.find((c) => c.id === id))  // ← look up live coin
  .filter(Boolean)                                // ← skip if not found
  .map((coin) => (
    <div key={coin.id} className="watchlist-coin">
                      <div className="watchlist-coin-left">
                        <img src={coin.image} className="market-coin-image" alt={coin.name} />
                        <div>
                          <h4>{coin.symbol.toUpperCase()}</h4>
                          <p>{coin.name}</p>
                        </div>
                      </div>

                      <div className="watchlist-price">
                        ${coin.current_price?.toLocaleString() ?? "0"}
                      </div>

                      <div className={coin.price_change_percentage_24h >= 0 ? "green" : "red"}>
                        {coin.price_change_percentage_24h >= 0 ? "▲" : "▼"}{" "}
                        {Math.abs(coin.price_change_percentage_24h || 0).toFixed(2)}%
                      </div>

                      <button className="remove-btn" onClick={() => removeCoin(list.id, coin.id)}>
                        −
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Watchlist;