import { useEffect, useState } from "react";

export default function App() {
  const [advice, setAdv] = useState("Advice will appear here!");
  const [count, setCount] = useState(0);

  async function getAdv() {
    const res = await fetch(
      `https://api.adviceslip.com/advice?t=${Date.now()}`,
    );
    const data = await res.json();
    setAdv(data.slip.advice);
    setCount((c) => c + 1);
  }

  useEffect(function () {
    getAdv();
  }, []);

  return (
    <div>
      <h1>{advice}</h1>
      <button onClick={getAdv}>get advice</button>
      <Message count={count} />
    </div>
  );
}

function Message(props) {
  return (
    <p>
      you have read <strong>{props.count}</strong> pieces of advice
    </p>
  );
}
