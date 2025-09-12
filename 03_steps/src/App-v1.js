// this is the original steps app which was made and completed

import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  return (
    <div>
      <Steps />
      <Steps />
    </div>
  );
}

function Steps() {
  const [step, stepChange] = useState(1);
  const [open, setOpen] = useState(true);
  // const [test, setTest] = useState({ name: "john" });

  function handlePrev() {
    if (step > 1) {
      stepChange((s) => s - 1);
      // below one works, but above one is a better practice
      // stepChange(step - 1);

      // if you try to do stuff written below, it wont show on UI because there is no way for react to know that you are trying to change the state and it wont re render the UI
      // state = state - 1
    }
  }

  function handleNext() {
    if (step < 3) {
      stepChange((s) => s + 1);
      // stepChange(step + 1);
    }
    // this will work but its a BAD PRACTICE and would not work or could go wrong in complex situations
    // test.name = "fred";

    // this is correct way to do it
    // setTest({ name: "fred" });
  }

  return (
    <div>
      <button
        className="close"
        onClick={() => {
          setOpen((is) => !is);
        }}
      >
        &times;
      </button>
      {open && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>

          <p className="message">
            Step {step}: {messages[step - 1]} {/*{test.name}*/}
          </p>

          <div className="buttons">
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={handlePrev}
            >
              Previous
            </button>
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
