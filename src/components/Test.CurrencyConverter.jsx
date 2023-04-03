import axios from 'axios';
import { act } from 'react-dom/test-utils';
import { render, screen, fireEvent } from '@testing-library/react';
import CurrencyConverter from './CurrencyConverter';

jest.mock('axios');

describe('CurrencyConverter', () => {
  it('should convert currency to bitcoin on button click', async () => {
    axios.get.mockResolvedValue({
      data: {
        bpi: {
          USD: {
            rate_float: 50000,
          },
        },
      },
    });

    await act(async () => {
      render(<CurrencyConverter />);
    });

    const currencySelect = screen.getByLabelText('Select Currency:');
    const amountInput = screen.getByLabelText('Enter Amount:');
    const convertToBTCButton = screen.getByRole('button', { name: 'Convert to Bitcoin' });
    const convertedAmountInput = screen.getByLabelText('Converted Amount:');

    fireEvent.change(currencySelect, { target: { value: 'USD' } });
    fireEvent.change(amountInput, { target: { value: '1000' } });
    fireEvent.click(convertToBTCButton);

    expect(axios.get).toHaveBeenCalledWith('https://api.coindesk.com/v1/bpi/currentprice/USD.json');
    expect(convertedAmountInput.value).toBe('0.02');
  });
});
