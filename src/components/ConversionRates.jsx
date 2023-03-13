import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ConversionRates = () => {
  const [rates, setRates] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchRates = async () => {
      const response = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json');
      const rates = [
        { currency: 'USD', rate: response.data.bpi.USD.rate_float },
        { currency: 'EUR', rate: response.data.bpi.EUR.rate_float },
        { currency: 'GBP', rate: response.data.bpi.GBP.rate_float }
      ];
      setRates(rates);
    }
    fetchRates();
  }, []);

  const handleSort = () => {
    if (sortOrder === 'asc') {
      setRates([...rates].sort((a, b) => b.rate - a.rate));
      setSortOrder('desc');
    } else {
      setRates([...rates].sort((a, b) => a.rate - b.rate));
      setSortOrder('asc');
    }
  }

  return (

          <section id="conversion-rates">
            <h2>Current Conversion Rates</h2>
            <button onClick={handleSort}>Sort by {sortOrder === 'asc' ? 'Descending' : 'Ascending'} Rate Order</button>
            <div>
              {rates.map(rate => (
                <div key={rate.currency}>
                  <h3>{rate.currency}</h3>
                  <p>1 BTC = {rate.rate.toFixed(2)} {rate.currency}</p>
                  <p>1 {rate.currency} = {(1 / rate.rate).toFixed(8)} BTC</p>
                </div>
              ))}
            </div>
          </section>

      );
     
    
}

export default ConversionRates;
