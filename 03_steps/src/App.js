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
    </div>
  );
}

function Steps() {
  const [step, stepChange] = useState(1);
  const [open, setOpen] = useState(true);

  function handlePrev() {
    if (step > 1) {
      stepChange((s) => s - 1);
    }
  }

  function handleNext() {
    if (step < 3) {
      stepChange((s) => s + 1);
    }
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
            {/* we can also pass childrens like a normal html element and not just close every react component in itself  */}
            <Button bgColor="#7950f2" textColor="#fff" onClick={handlePrev}>
              👈 Previous
            </Button>
            <Button bgColor="#7950f2" textColor="#fff" onClick={handleNext}>
              Next 👉
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// you dont need to pass children with element, its pre defined in js
function Button({ textColor, bgColor, onClick, children }) {
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
    >
      {/* children helps making component more reusable by keeping it empty void and you can put whatever you want in the jsx */}
      {children}
    </button>
  );
}
