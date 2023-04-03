import React, { useState, useEffect } from 'react';
import ConversionRates from './components/ConversionRates';
import CurrencyConverter from './components/CurrencyConverter';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [lastFetchTime, setLastFetchTime] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [showConversionRates, setShowConversionRates] = useState(false);
  const [showCurrencyConverter, setShowCurrencyConverter] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsFetching(true);
        const response = await axios.get(
          'https://api.coindesk.com/v1/bpi/currentprice.json'
        );
        setData(response.data.bpi);
        setLastFetchTime(response.data.time.updated);
        setIsFetching(false);
      } catch (error) {
        console.log(error);
        setIsFetching(false);
      }
    };

    fetchData();
  }, []);

  const handleRefetch = async () => {
    if (!isFetching) {
      const currentTime = new Date().getTime();
      const fiveMinutes = 300000;
      if (
        !lastFetchTime ||
        currentTime - new Date(lastFetchTime).getTime() >= fiveMinutes
      ) {
        try {
          setIsFetching(true);
          const response = await axios.get(
            'https://api.coindesk.com/v1/bpi/currentprice.json'
          );
          setData(response.data.bpi);
          setLastFetchTime(response.data.time.updated);
          setIsFetching(false);
        } catch (error) {
          console.log(error);
          setIsFetching(false);
        }
      }
    }
  };

  const handleShowConversionRates = () => {
    setShowConversionRates(true);
    setShowCurrencyConverter(false);
  };

  const handleShowCurrencyConverter = () => {
    setShowConversionRates(false);
    setShowCurrencyConverter(true);
  };

  const convertTime = (time) => {
    const utcDate = new Date(time);
    const localDate = new Date(
      utcDate.getTime() + utcDate.getTimezoneOffset() * 60000
    );
    return localDate.toString();
  };

  return (
    <div>
      <main>
        <h1>Bitcoin and Currency Conversions</h1>
        <p>Last updated: {lastFetchTime && convertTime(lastFetchTime)}</p>
        <button onClick={handleRefetch} disabled={isFetching}>
          {isFetching ? 'Fetching...' : 'Refresh'}
        </button>
        <button onClick={handleShowConversionRates}>Conversion Rates</button>
        <button onClick={handleShowCurrencyConverter}>
          Currency Converter{' '}
        </button>
        {showConversionRates && <ConversionRates data={data} />}
        {showCurrencyConverter && <CurrencyConverter />}
      </main>
    </div>
  );
}

export default App;
