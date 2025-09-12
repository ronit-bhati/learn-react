import { useState } from "react";

export default function App() {
  const [billVal, setBillVal] = useState(0);
  const [expRating, setExpRating] = useState(10);
  const [expRatingFren, setExpRatingFren] = useState(10);

  return (
    <div className="App">
      <BillInput billVal={billVal} setBillVal={setBillVal} />
      <ReviewInput expRating={expRating} setExpRating={setExpRating}>
        <label>How did you like the service?</label>
      </ReviewInput>
      <ReviewInput expRating={expRatingFren} setExpRating={setExpRatingFren}>
        <label>How did your friend like the service?</label>
      </ReviewInput>
      <BillCalc
        billVal={billVal}
        expRating={expRating}
        expRatingFren={expRatingFren}
      />
      <Reset
        setBillVal={setBillVal}
        setExpRating={setExpRating}
        setExpRatingFren={setExpRatingFren}
      />
    </div>
  );
}

function BillInput({ billVal, setBillVal }) {
  function valChangeHandler(e) {
    setBillVal(parseInt(e.target.value));
  }

  return (
    <div>
      <label>How much was the bill?</label>
      <input
        value={billVal}
        onChange={(e) => valChangeHandler(e)}
        type="number"
      />
    </div>
  );
}

function ReviewInput({ expRating, setExpRating, children }) {
  function ratingChangeHandler(e) {
    setExpRating(parseInt(e.target.value));
  }

  return (
    <div>
      {children}
      <select value={expRating} onChange={(e) => ratingChangeHandler(e)}>
        <option value="0">Dissatisfied (0%)</option>
        <option value="5">It was okay (5%)</option>
        <option value="10">It was good (10%)</option>
        <option value="20">Absolutely amazing! (20%)</option>
      </select>
    </div>
  );
}

function BillCalc({ billVal, expRating, expRatingFren }) {
  if (!billVal) {
    billVal = 0;
  }

  let avgRating = 0;

  if (billVal !== 0) {
    avgRating = (expRating + expRatingFren) / 2;
  }

  const tip = billVal * (avgRating / 100);
  const tipRounded = Math.round(tip * 100) / 100;

  return (
    <div>
      <p>
        <b>
          You pay ${billVal + tipRounded} (${billVal} + ${tipRounded} tip)
        </b>
      </p>
    </div>
  );
}

function Reset({ setBillVal, setExpRating, setExpRatingFren }) {
  function resetHandler() {
    setBillVal(0);
    setExpRating(10);
    setExpRatingFren(10);
  }

  return <button onClick={resetHandler}>Reset</button>;
}
