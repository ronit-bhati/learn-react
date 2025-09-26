import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";

const popularCodes = ["USD", "EUR", "GBP", "INR", "JPY", "AUD", "CAD"];

const currencyOptions = [
  { code: "AUD", name: "Australian Dollar" },
  { code: "BGN", name: "Bulgarian Lev" },
  { code: "BRL", name: "Brazilian Real" },
  { code: "CAD", name: "Canadian Dollar" },
  { code: "CHF", name: "Swiss Franc" },
  { code: "CNY", name: "Chinese Yuan" },
  { code: "CZK", name: "Czech Koruna" },
  { code: "DKK", name: "Danish Krone" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound" },
  { code: "HKD", name: "Hong Kong Dollar" },
  { code: "HRK", name: "Croatian Kuna" },
  { code: "HUF", name: "Hungarian Forint" },
  { code: "IDR", name: "Indonesian Rupiah" },
  { code: "ILS", name: "Israeli Shekel" },
  { code: "INR", name: "Indian Rupee" },
  { code: "ISK", name: "Icelandic Króna" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "KRW", name: "South Korean Won" },
  { code: "MXN", name: "Mexican Peso" },
  { code: "MYR", name: "Malaysian Ringgit" },
  { code: "NOK", name: "Norwegian Krone" },
  { code: "NZD", name: "New Zealand Dollar" },
  { code: "PHP", name: "Philippine Peso" },
  { code: "PLN", name: "Polish Zloty" },
  { code: "RON", name: "Romanian Leu" },
  { code: "SEK", name: "Swedish Krona" },
  { code: "SGD", name: "Singapore Dollar" },
  { code: "THB", name: "Thai Baht" },
  { code: "TRY", name: "Turkish Lira" },
  { code: "USD", name: "United States Dollar" },
  { code: "ZAR", name: "South African Rand" },
];

export default function App() {
  const [amount, setAmount] = useState("100.00");
  const [currFrom, setCurrFrom] = useState("USD");
  const [currTo, setCurrTo] = useState("INR");
  const [convertedAmountOut, setConvertedAmountOut] = useState(null);
  const [rate, setRate] = useState(null);
  const [lastSync, setLastSync] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const parsedAmount = useMemo(() => {
    if (amount === "") return null;
    const numeric = Number.parseFloat(amount);
    return Number.isFinite(numeric) ? numeric : null;
  }, [amount]);

  useEffect(() => {
    if (amount === "") {
      setConvertedAmountOut(null);
      setRate(null);
      setLastSync(null);
      setError("");
      setIsLoading(false);
      return;
    }

    if (parsedAmount === null) {
      setConvertedAmountOut(null);
      setRate(null);
      setLastSync(null);
      setError("Enter a valid numeric amount");
      setIsLoading(false);
      return;
    }

    if (parsedAmount === 0) {
      setConvertedAmountOut("0.00");
      setRate(currFrom === currTo ? 1 : null);
      setLastSync(null);
      setError("");
      setIsLoading(false);
      return;
    }

    if (currFrom === currTo) {
      setConvertedAmountOut(parsedAmount.toFixed(2));
      setRate(1);
      setLastSync(new Date().toISOString().slice(0, 10));
      setError("");
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();

    async function convert() {
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://api.frankfurter.dev/v1/latest?base=${currFrom}&symbols=${currTo}`,
          { signal: controller.signal },
        );

        if (!res.ok) {
          throw new Error("Failed to retrieve rates");
        }

        const data = await res.json();
        const nextRate = data?.rates?.[currTo];

        if (typeof nextRate !== "number") {
          throw new Error("Missing rate for selected currency");
        }

        setConvertedAmountOut((parsedAmount * nextRate).toFixed(2));
        setRate(nextRate);
        setLastSync(data.date);
        setError("");
      } catch (err) {
        if (err.name === "AbortError") return;
        setError("Conversion temporarily unavailable");
        setConvertedAmountOut(null);
        setRate(null);
        setLastSync(null);
      } finally {
        setIsLoading(false);
      }
    }

    convert();

    return () => controller.abort();
  }, [amount, currFrom, currTo, parsedAmount]);

  const handleAmount = (event) => {
    setAmount(event.target.value);
  };

  const handleSwap = () => {
    setCurrFrom(currTo);
    setCurrTo(currFrom);
  };

  const formattedRate =
    rate != null ? `1 ${currFrom} = ${rate.toFixed(4)} ${currTo}` : null;

  const lastUpdatedDisplay = lastSync
    ? new Date(`${lastSync}T00:00:00Z`).toLocaleString(undefined, {
        hour: "numeric",
        minute: "2-digit",
        month: "short",
        day: "numeric",
      })
    : null;

  const displayConverted =
    convertedAmountOut != null
      ? `${convertedAmountOut} ${currTo}`
      : error
        ? error
        : "Enter an amount to see the glow";

  return (
    <div className="app-shell">
      <div className="aurora aurora-one" aria-hidden="true" />
      <div className="aurora aurora-two" aria-hidden="true" />
      <main className="converter-card">
        <header className="card-header">
          <span className="badge">Live FX</span>
          <h1 className="headline">Currency Alchemy</h1>
          <p className="subhead">
            Convert, experiment, and flow through exchange rates with a neon-ready
            dashboard.
          </p>
        </header>

        <section className="amount-section">
          <label className="field-label" htmlFor="amount-input">
            Amount
          </label>
          <div className={`input-shell ${isLoading ? "is-loading" : ""}`}>
            <span className="input-prefix">{currFrom}</span>
            <input
              id="amount-input"
              type="number"
              min="0"
              step="0.01"
              inputMode="decimal"
              placeholder="1,000.00"
              value={amount}
              onChange={handleAmount}
            />
            <span className="focus-ring" aria-hidden="true" />
          </div>
        </section>

        <section className="currency-pair" aria-label="Choose currencies">
          <div className="selector-group">
            <label
              className="field-label"
              htmlFor="currency-from"
              id="currency-from-label"
            >
              From
            </label>
            <CurrencySelector
              id="currency-from"
              value={currFrom}
              onCurrChange={setCurrFrom}
              labelId="currency-from-label"
            />
          </div>

          <button type="button" className="swap-button" onClick={handleSwap}>
            <span className="swap-glyph" aria-hidden="true">
              ⇆
            </span>
            <span className="sr-only">Swap currencies</span>
          </button>

          <div className="selector-group">
            <label
              className="field-label"
              htmlFor="currency-to"
              id="currency-to-label"
            >
              To
            </label>
            <CurrencySelector
              id="currency-to"
              value={currTo}
              onCurrChange={setCurrTo}
              labelId="currency-to-label"
            />
          </div>
        </section>

        <section
          className={`result-card ${
            isLoading ? "result-card--loading" : ""
          }`}
          aria-live="polite"
        >
          <div className="result-top">
            <span className="result-label">Converted amount</span>
            <p className="result-value">{displayConverted}</p>
          </div>
          {formattedRate && (
            <p className="rate-line">
              <span className="spark" aria-hidden="true" />
              {formattedRate}
            </p>
          )}
          {lastUpdatedDisplay && (
            <p className="meta-line">Synced · {lastUpdatedDisplay}</p>
          )}
        </section>

        <section className="insights-grid" aria-label="FX insights">
          <article className="insight-tile">
            <h2>Signal strength</h2>
            <p>
              {isLoading
                ? "Sampling market data..."
                : rate
                  ? "Mirroring the live interbank mid-rate." 
                  : "Waiting for your next move."}
            </p>
          </article>
          <article className="insight-tile">
            <h2>FX mood</h2>
            <p>
              {error
                ? "Network turbulence detected—hang tight."
                : "Stable drift with adaptive glow visuals."}
            </p>
          </article>
          <article className="insight-tile">
            <h2>Session note</h2>
            <p>
              Swap pairs on the fly and watch the glass interface respond with
              kinetic color.
            </p>
          </article>
        </section>
      </main>
    </div>
  );
}

function CurrencySelector({ id, value, onCurrChange, labelId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(() => {
    const index = currencyOptions.findIndex((option) => option.code === value);
    return index === -1 ? 0 : index;
  });
  const [searchTerm, setSearchTerm] = useState("");
  const triggerRef = useRef(null);
  const listRef = useRef(null);

  const selectedOption = useMemo(() => {
    return (
      currencyOptions.find((option) => option.code === value) ??
      currencyOptions[0]
    );
  }, [value]);

  useEffect(() => {
    const index = currencyOptions.findIndex((option) => option.code === value);
    setActiveIndex(index === -1 ? 0 : index);
    setSearchTerm("");
    setIsOpen(false);
  }, [value]);

  useEffect(() => {
    function handlePointerDown(event) {
      if (
        triggerRef.current?.contains(event.target) ||
        listRef.current?.contains(event.target)
      ) {
        return;
      }
      setIsOpen(false);
    }

    window.addEventListener("pointerdown", handlePointerDown);
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    function handleEscape(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    }

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !listRef.current) return;
    const node = listRef.current.querySelector(
      `[data-index="${activeIndex}"]`,
    );
    node?.scrollIntoView({ block: "nearest" });
  }, [isOpen, activeIndex]);

  const filteredOptions = useMemo(() => {
    if (!searchTerm.trim()) return currencyOptions;
    const term = searchTerm.trim().toLowerCase();
    return currencyOptions.filter((option) => {
      return (
        option.code.toLowerCase().includes(term) ||
        option.name.toLowerCase().includes(term)
      );
    });
  }, [searchTerm]);

  useEffect(() => {
    if (!isOpen) return;
    if (!filteredOptions.length) {
      setActiveIndex(-1);
      return;
    }
    const currentOption = filteredOptions[activeIndex];
    if (!currentOption || !filteredOptions.includes(currentOption)) {
      setActiveIndex(0);
    }
  }, [filteredOptions, isOpen, activeIndex]);

  const commitSelection = (index) => {
    const option = filteredOptions[index];
    if (!option) return;
    onCurrChange(option.code);
    setIsOpen(false);
    requestAnimationFrame(() => {
      triggerRef.current?.focus();
    });
  };

  const moveActive = (delta) => {
    const total = filteredOptions.length;
    if (total === 0) return;
    setIsOpen(true);
    setActiveIndex((current) => {
      const base = current < 0 ? 0 : current;
      const next = (base + delta + total) % total;
      return next;
    });
  };

  const setActive = (index) => {
    if (!filteredOptions.length) return;
    setIsOpen(true);
    setActiveIndex(Math.max(0, Math.min(index, filteredOptions.length - 1)));
  };

  const handleTriggerKeyDown = (event) => {
    if (event.key === "Tab") {
      setIsOpen(false);
      return;
    }

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        moveActive(1);
        break;
      case "ArrowUp":
        event.preventDefault();
        moveActive(-1);
        break;
      case "Home":
        event.preventDefault();
        setActive(0);
        break;
      case "End":
        event.preventDefault();
        setActive(currencyOptions.length - 1);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          commitSelection(activeIndex);
        }
        break;
      default: {
        const searchKey = event.key.toLowerCase();
        if (searchKey.length === 1 && /[a-z0-9]/.test(searchKey)) {
          event.preventDefault();
          setIsOpen(true);
          setSearchTerm((prev) => prev + searchKey);
        }
      }
    }
  };

  const activeOption = filteredOptions[activeIndex] ?? null;
  const listboxId = `${id}-listbox`;
  const valueId = `${id}-value`;
  const labelledBy = labelId ? `${labelId} ${valueId}` : `${valueId}`;

  return (
    <div
      className={`custom-select${isOpen ? " is-open" : ""}`}
      data-open={isOpen}
    >
      <button
        id={id}
        type="button"
        className={`select-trigger${isOpen ? " is-open" : ""}`}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-activedescendant={
          isOpen && activeOption ? `${id}-option-${activeOption.code}` : undefined
        }
        aria-labelledby={labelledBy}
        onClick={() => setIsOpen((open) => !open)}
        onKeyDown={handleTriggerKeyDown}
        ref={triggerRef}
      >
        <span className="select-trigger__text" id={valueId}>
          <span className="select-code">{selectedOption.code}</span>
          <span className="select-name">{selectedOption.name}</span>
        </span>
        <span className="select-arrow" aria-hidden="true" />
      </button>

      <div className="select-popover" ref={listRef} role="presentation">
        <div className="select-search">
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            autoComplete="off"
            placeholder="Search currency or code"
            spellCheck="false"
          />
          <span className="search-icon" aria-hidden="true" />
        </div>
        <ul
          className="select-menu"
          role="listbox"
          id={listboxId}
          aria-labelledby={labelledBy}
          tabIndex={-1}
          aria-hidden={!isOpen}
        >
          {filteredOptions.length === 0 ? (
            <li className="select-option select-option--empty" role="presentation">
              No matches. Try another search.
            </li>
          ) : (
            <OptionList
              id={id}
              options={filteredOptions}
              activeIndex={activeIndex}
              selectedCode={selectedOption.code}
              onSelect={commitSelection}
              onHover={setActiveIndex}
            />
          )}
        </ul>
      </div>
    </div>
  );
}

function OptionList({ id, options, activeIndex, selectedCode, onSelect, onHover }) {
  const groups = useMemo(() => {
    const popular = [];
    const others = [];
    options.forEach((option) => {
      if (popularCodes.includes(option.code)) {
        popular.push(option);
      } else {
        others.push(option);
      }
    });
    return [
      { label: "Popular", items: popular },
      { label: "All currencies", items: others },
    ].filter((group) => group.items.length > 0);
  }, [options]);

  let runningIndex = 0;

  return groups.map((group) => {
    const groupStartIndex = runningIndex;
    const content = group.items.map((option, index) => {
      const optionIndex = groupStartIndex + index;
      runningIndex += 1;
      const isSelected = option.code === selectedCode;
      const isActive = optionIndex === activeIndex;
      return (
        <li
          key={option.code}
          id={`${id}-option-${option.code}`}
          role="option"
          aria-selected={isSelected}
          className={`select-option${isSelected ? " is-selected" : ""}${
            isActive ? " is-active" : ""
          }`}
          data-index={optionIndex}
          onMouseEnter={() => onHover(optionIndex)}
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => onSelect(optionIndex)}
        >
          <span className="select-option__code">{option.code}</span>
          <span className="select-option__name">{option.name}</span>
        </li>
      );
    });

    return (
      <li key={group.label} role="presentation" className="select-group">
        <div className="select-group__label">{group.label}</div>
        <ul role="presentation" className="select-group__list">
          {content}
        </ul>
      </li>
    );
  });
}
