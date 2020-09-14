import React, { useState, useEffect } from "react";
import PriceCheckerLayout from "../../ui/Layout/PriceCheckerLayout";
import PageLayout from "../../ui/Layout/PageLayout";

export default function PriceTracker({ prices }) {
  const [tabs] = useState(["Bitcoin", "Ethereum"]);
  const [pages, setPages] = useState([]);
  useEffect(() => {
    setPages([
      <PriceCheckerLayout
        currency={"Bitcoin"}
        prices={prices.bitcoin}
        currentPrice={prices.btcPrice}
      />,
      <PriceCheckerLayout
        currency={"Ethereum"}
        prices={prices.ethereum}
        currentPrice={prices.ethPrice}
      />,
    ]);
  }, [prices]);

  return <PageLayout tabs={tabs} pages={pages}></PageLayout>;
}
