import React, { useState } from 'react';
import axios from 'axios';

const CurrencyConverter = () => {
  const [currency, setCurrency] = useState('USD');
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState('');

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleConvert = async () => {
    const response = await axios.get(
      `https://api.coindesk.com/v1/bpi/currentprice/${currency}.json`
    );
    const rate = response.data.bpi[currency].rate_float;
    const converted = +(amount / rate).toFixed(8);
    setConvertedAmount(converted);
  };

  const handleConvertToBTC = async () => {
    const response = await axios.get(
      `https://api.coindesk.com/v1/bpi/currentprice/${currency}.json`
    );
    const rate = response.data.bpi[currency].rate_float;
    const converted = +(amount * rate).toFixed(8);
    setConvertedAmount(converted);
  };

  return (
    <section id="currency-converter">
      <h2>Currency Converter</h2>
      <form onSubmit={handleConvert}>
        <label htmlFor="currency">Select Currency:</label>
        <select id="currency" value={currency} onChange={handleCurrencyChange}>
          <option value="USD">United States Dollar (USD)</option>
          <option value="EUR">Euro (EUR)</option>
          <option value="GBP">British Pound Sterling (GBP)</option>
        </select>
        <label htmlFor="amount">Enter Amount:</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={handleAmountChange}
        />
        <button type="button" onClick={handleConvert}>
          Convert to Bitcoin
        </button>
        <button type="button" onClick={handleConvertToBTC}>
          Convert to {currency}
        </button>
        <label htmlFor="convertedAmount">Converted Amount:</label>
        <input
          type="number"
          id="convertedAmount"
          value={convertedAmount}
          readOnly
        />
      </form>
    </section>
  );
};

export default CurrencyConverter;
