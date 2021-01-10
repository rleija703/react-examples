import { useState } from "react";
import Head from "next/head";
import fetch from "isomorphic-fetch";

const COINBASE_BASE_URL = "https://api.coinbase.com/v2";

const useCoinbaseAPI = () => {
  // Holds value for search form
  const [symbol, setSymbol] = useState("");

  // Holds data value of cryptocurrency market data
  const [data, setData] = useState(null);

  // Holds error messages from Coinbase API
  const [error, setError] = useState(null);

  return {
    setSymbol,
    data,
    error,
    getTodayPrice: async () => {
      try {
        // No need to make a request if symbol value is empty.
        if (symbol.trim().length < 1) {
          console.log("Symbol is empty");
          return;
        }

        // Fetch ticker data from Coinbase API
        const res = await fetch(`${COINBASE_BASE_URL}/prices/${symbol.trim()}/buy`);
        const { errors, data } = await res.json();

        // IF any errors, set error to state
        if (errors) {
          setError(errors);
          return;
        }

        // Set ticker data to state
        setData(data);
        return;
      } catch (e) {
        console.error(e);
      }
    }
  };
};

export default () => {
  const { getTodayPrice, setSymbol, data, error } = useCoinbaseAPI();

  // On submit handler
  const handleSubmit = () => getTodayPrice();

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
                  {data[dataKey]}
                </h3>
                <p className="card-label">
                  {dataKey}
                </p>
              </div>
            ))}
          </div>
        ))}
    </>
  );
};
