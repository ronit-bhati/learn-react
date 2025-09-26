import { useEffect, useState } from "react";

export default function App() {
  const [amount, setAmount] = useState(0);
  const [currFrom, setCurrFrom] = useState("USD");
  const [currTo, setCurrTo] = useState("INR");
  const [convertedAmountOut, setConvertedAmountOut] = useState(0.0);

  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  const handleCurrFrom = (e) => {
    setCurrFrom(e.target.value);
  };

  const handleCurrTo = (e) => {
    setCurrTo(e.target.value);
  };

  useEffect(
    function () {
      if (currFrom === currTo) {
        setConvertedAmountOut(amount);
        return;
      }
      async function convert() {
        try {
          const res = await fetch(
            `https://api.frankfurter.dev/v1/latest?base=${currFrom}&symbols=${currTo}`,
          );
          const data = await res.json();

          if (!res.ok) {
            setConvertedAmountOut("error occurred!");
            return;
          } else {
            const convertedAmount = (amount * data.rates[currTo]).toFixed(2);
            setConvertedAmountOut(convertedAmount);
          }
        } catch (error) {
          setConvertedAmountOut("error occurred!");
        }
      }
      convert();
    },
    [currFrom, currTo, amount],
  );

  return (
    <div>
      <input type="text" onChange={(e) => handleAmount(e)} />{" "}
      <label htmlFor="currFrom">From: </label>
      <CurrencySelector
        id="currFrom"
        value={currFrom}
        onCurrChange={(e) => handleCurrFrom(e)}
      />
      <label htmlFor="currTo">To: </label>
      <CurrencySelector
        id="currTo"
        value={currTo}
        onCurrChange={(e) => handleCurrTo(e)}
      />
      <p>{convertedAmountOut}</p>
    </div>
  );
}

function CurrencySelector({ id, value, onCurrChange }) {
  return (
    <select id={id} value={value} onChange={onCurrChange}>
      <option value="ADP">ADP</option>
      <option value="BGN">BGN</option>
      <option value="BRL">BRL</option>
      <option value="CAD">CAD</option>
      <option value="CHF">CHF</option>
      <option value="CNY">CNY</option>
      <option value="CZK">CZK</option>
      <option value="DKK">DKK</option>
      <option value="EUR">EUR</option>
      <option value="GBP">GBP</option>
      <option value="HKD">HKD</option>
      <option value="HRK">HRK</option>
      <option value="IDR">IDR</option>
      <option value="ILS">ILS</option>
      <option value="INR">INR</option>
      <option value="ISK">ISK</option>
      <option value="JPY">JPY</option>
      <option value="KRW">KRW</option>
      <option value="MXN">MXN</option>
      <option value="MYR">MYR</option>
      <option value="NOK">NOK</option>
      <option value="NZD">NZD</option>
      <option value="PHP">PHP</option>
      <option value="PLN">PLN</option>
      <option value="RON">RON</option>
      <option value="SEK">SEK</option>
      <option value="SGD">SGD</option>
      <option value="THB">THB</option>
      <option value="TRY">TRY</option>
      <option value="USD">USD</option>
      <option value="ZAR">ZAR</option>
    </select>
  );
}
