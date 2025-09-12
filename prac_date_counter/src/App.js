import { useState } from "react";

function App() {
  const [step, stepUpdate] = useState(1);
  const [count, countUpdate] = useState(0);

  return (
    <div className="container">
      <StepSize step={step} stepUpdate={stepUpdate} />
      <Counter count={count} countUpdate={countUpdate} />
      <GetCurrDate step={step} count={count} />
      <Reset
        step={step}
        stepUpdate={stepUpdate}
        count={count}
        countUpdate={countUpdate}
      />
    </div>
  );
}

function StepSize({ step, stepUpdate }) {
  // function handlePrev() {
  //   if (step > 1) {
  //     stepUpdate((s) => s - 1);
  //   }
  // }
  //
  // function handleNext() {
  //   stepUpdate((s) => s + 1);
  // }

  function handleReset(e) {
    stepUpdate(parseInt(e.target.value));
  }

  return (
    <div>
      {/* <button onClick={handlePrev}> - </button> */}
      {/* Step: {step} */}
      {/* <button onClick={handleNext}> + </button> */}
      <input
        onChange={(e) => handleReset(e)}
        type="range"
        name="step"
        min="1"
        max="30"
        value={step}
      />
      <label htmlFor="step">Step: {step}</label>
    </div>
  );
}

function Counter({ count, countUpdate }) {
  function handlePrev() {
    if (count > 0) {
      countUpdate((c) => c - 1);
    }
  }

  function handleNext() {
    countUpdate((c) => c + 1);
  }

  function handleChange(e) {
    countUpdate(e.target.value);
  }

  return (
    <div>
      Count:
      <button onClick={handlePrev}> - </button>
      <input onChange={(e) => handleChange(e)} value={count} />
      <button onClick={handleNext}> + </button>
    </div>
  );
}

function GetCurrDate({ step, count }) {
  const currDate = new Date();
  const otherDate = new Date(currDate);
  otherDate.setDate(currDate.getDate() + step * count);

  return (
    <div>
      {step * count} days from today is&nbsp;
      {otherDate.toLocaleDateString("en-US", { weekday: "short" })},{" "}
      {otherDate.getDate()}{" "}
      {otherDate.toLocaleDateString("en-US", { month: "short" })}{" "}
      {otherDate.getFullYear()}
    </div>
  );
}

function Reset({ step, count, stepUpdate, countUpdate }) {
  function handleClick() {
    stepUpdate(1);
    countUpdate(0);
  }

  return (
    <div>
      {step !== 1 || count !== 0 ? (
        <button onClick={handleClick}>Reset</button>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
