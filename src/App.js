import { useState, useEffect } from "react";
// https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD

function App() {
  const [amount, setAmount] = useState(0);
  const [currentCur, setCurrentCur] = useState("USD");
  const [selectedCur, setSelectedCur] = useState("USD");
  const [transformedVal, setTransformedVal] = useState(0);

  const handleAmountChange = (e) => {
    setAmount(+e.target.value);
  };

  const handleCurrentCur = (e) => {
    setCurrentCur(e.target.value);
  };

  const handleSelectedCur = (e) => {
    setSelectedCur(e.target.value);
  };

  useEffect(() => {
    const controller = new AbortController();
    async function fetchData() {
      try {
        if (currentCur === selectedCur) return;
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${currentCur}&to=${selectedCur}`,
          { signal: controller.signal }
        );
        const data = await res.json();
        setTransformedVal(data.rates[selectedCur]);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
    return () => {
      controller.abort();
    };
  }, [amount, currentCur, selectedCur]);

  return (
    <div className="App">
      <input type="number" value={amount} onChange={handleAmountChange} />
      <select value={currentCur} onChange={handleCurrentCur}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={selectedCur} onChange={handleSelectedCur}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        Output:
        <strong>
          {currentCur === selectedCur ? amount : transformedVal} {selectedCur}
        </strong>
      </p>
    </div>
  );
}

export default App;
