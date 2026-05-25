import { useState, useEffect, useRef } from "react";

const SORT_OPTIONS = [
  { value: "market_cap_asc",  label: "Market Cap (Low To High)"  },
  { value: "market_cap_desc", label: "Market Cap (High To Low)" },
  { value: "price_desc",      label: "Price (High To Low)"       },
  { value: "price_asc",       label: "Price (Low To High)"       },
  { value: "change_desc",     label: "24h Change (High To Low)"  },
  { value: "change_asc",      label: "24h Change (Low To High)"  },
];

const SortSelector = ({ sortBy, onSortChange }) => {
  const [open, setOpen] = useState(false);
const ref = useRef(null);

useEffect(() => {
  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setOpen(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

  const current =
    SORT_OPTIONS.find((o) => o.value === sortBy) || SORT_OPTIONS[1];

  return (
    <div className="controls" ref={ref}>
      <label>Sort By:</label>

      <div className="custom-select-wrapper">
        <button
          className="custom-select-trigger"
          onClick={() => setOpen((prev) => !prev)}
        >
          {current.label}
          <span className="custom-select-arrow">{open ? "▲" : "▼"}</span>
        </button>

        {open && (
          <ul className="custom-select-options">
            {SORT_OPTIONS.map((opt) => (
              <li
                key={opt.value}
                className={`custom-select-option ${sortBy === opt.value ? "active" : ""}`}
                onClick={() => {
                  onSortChange(opt.value);
                  setOpen(false);
                }}
              >
                {opt.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SortSelector;