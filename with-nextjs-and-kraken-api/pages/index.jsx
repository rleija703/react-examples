import { useState } from "react";
import Head from "next/head";
import fetch from "isomorphic-fetch";

const KRAKEN_API_URL = "https://api.kraken.com/0/public/Ticker";

const KRAKEN_DATA_LABELS = Object.freeze({
  a: "Ask",
  b: "Bid",
  c: "Last Trade Closed",
  v: "Volume",
  l: "Low",
  h: "High",
  o: "Today Opening Price"
});

const useFindTicker = () => {
  // Holds value for search form
  const [symbol, setSymbol] = useState("");

  // Holds data value of cryptocurrency market data
  const [data, setData] = useState(null);

  // Holds error messages from KRAKEN API
  const [error, setError] = useState(null);

  return {
    setSymbol,
    data,
    error,
    find: async () => {
      try {
        // No need to make a request if symbol value is empty.
        if (symbol.trim().length < 1) {
          console.log("Symbol is empty");
          return;
        }

        // Fetch ticker data from Kraken API
        const res = await fetch(`${KRAKEN_API_URL}?pair=${symbol.trim()}`);
        const { error, result } = await res.json();

        // IF any errors, set error to state
        if (error.length > 0) {
          setError(error);
          return;
        }

        // Set ticker data to state
        setData(
          Object.keys(result).reduce(
            (pv, cv) => ({
              ...result[cv]
            }),
            {}
          )
        );
        return;
      } catch (e) {
        console.error(e);
      }
    }
  };
};

export default () => {
  const { find, setSymbol, data, error } = useFindTicker();

  // On submit handler
  const handleSubmit = () => find();

  // On input change handler
  const handleChange = (e) => setSymbol(e.target.value);

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/styles.css" />
      </Head>
      <div className="container">
        <h2 className="headline">Search Cyrpto Currency Market Data</h2>
        <div className="rounded-form">
          <input type="text" placeholder="ETHUSD" onChange={handleChange} />
        </div>
        <div className="action-box">
          <button onClick={handleSubmit}>Search</button>
        </div>
      </div>
      {/*  */}
      {(error && <h1 className="headline">{error}</h1>) ||
        (data && (
          <div className="container result">
            {Object.keys(data).map((dataKey, i) => (
              <div key={`${dataKey}-${i}`} className="card">
                <h3 className="card-value">
                  {Array.isArray(data[dataKey])
                    ? data[dataKey][0]
                    : data[dataKey]}
                </h3>
                <p className="card-label">{KRAKEN_DATA_LABELS[dataKey]}</p>
              </div>
            ))}
          </div>
        ))}
    </>
  );
};
