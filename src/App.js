// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useState, useEffect } from "react";
import "./index.css";

export default function App() {
  const [selectFrom, setSelectFrom] = useState("USD");
  const [selectTo, setSelectTo] = useState("EUR");
  const [userInput, setUserInput] = useState(1);

  const [currencyConvert, setCurrencyConvert] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleSwitch() {
    setSelectFrom(selectTo);
    setSelectTo(selectFrom);
  }

  useEffect(
    function () {
      try {
        async function getCurrencyDetails() {
          setIsLoading(true);
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${userInput}&from=${selectFrom}&to=${selectTo}`
          );
          const data = await res.json();
          // console.log(data);

          setCurrencyConvert(data.rates[selectTo]);
          setIsLoading(false);
        }

        if (selectFrom === selectTo || Number(userInput) === 0) {
          setCurrencyConvert(userInput);
          return;
        }
        if (isNaN(userInput)) return setUserInput(0);

        getCurrencyDetails();
      } catch (err) {
        console.log(err);
      }
    },
    [userInput, selectFrom, selectTo]
  );

  return (
    <div className="container">
      <h1>Currency Converter</h1>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(Number(e.target.value))}
        placeholder="Enter Amount"
      />
      <div className="container-select">
        <select
          value={selectFrom}
          onChange={(e) => setSelectFrom(e.target.value)}
          disabled={isLoading}
        >
          <option value="USD">🏈 USD</option>
          <option value="EUR">💶 EUR</option>
          <option value="CAD">🍁 CAD</option>
          <option value="INR">🐘 INR</option>
        </select>
        <button onClick={handleSwitch}>🔄️</button>
        <select
          value={selectTo}
          onChange={(e) => setSelectTo(e.target.value)}
          disabled={isLoading}
        >
          <option value="USD">🏈 USD</option>
          <option value="EUR">💶 EUR</option>
          <option value="CAD">🍁 CAD</option>
          <option value="INR">🐘 INR</option>
        </select>
      </div>
      <div className="final-result">
        <p>{`${currencyConvert} ${selectTo}`}</p>
      </div>
    </div>
  );
}
