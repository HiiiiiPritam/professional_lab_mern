export async function currencyChange(amount, fromCurrency, toCurrency) {
  const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
  const data = await response.json();
  const exchangeRate = data.rates[toCurrency];
  return amount * exchangeRate;
}