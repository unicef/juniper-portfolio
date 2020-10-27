import { createContext } from "react";

const PriceContext = createContext({
  prices: {},
  btcRate: 0,
  ethRate: 0,
});

export default PriceContext;
