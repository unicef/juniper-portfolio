export default async (symbol) => {
  let res, price;
  try {
    res = await fetch(
      `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD`
    );
    price = await res.json();
  } catch (e) {
    console.log(e);
  }
  return price.USD;
};
