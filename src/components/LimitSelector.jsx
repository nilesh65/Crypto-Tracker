import { useState, useEffect, useRef } from "react";
const OPTIONS = [10, 20, 50, 100];

const LimitSelector = ({ limit = 10, onLimitChange }) => {
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
  return (
    <div className="controls">
      <label>Show:</label>

      <div className="custom-select-wrapper" ref={ref}>
        <button
          className="custom-select-trigger"
          onClick={() => setOpen((prev) => !prev)}
        >
          {limit}
          <span className="custom-select-arrow">{open ? "▲" : "▼"}</span>
        </button>

        {open && (
          <ul className="custom-select-options">
            {OPTIONS.map((n) => (
              <li
                key={n}
                className={`custom-select-option ${limit === n ? "active" : ""}`}
                onClick={() => {
                  onLimitChange(n);
                  setOpen(false);
                }}
              >
                {n}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default LimitSelector;