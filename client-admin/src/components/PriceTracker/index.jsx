import React, { useState, useEffect } from "react";
import PriceCheckerLayout from "../../ui/Layout/PriceCheckerLayout";
import PageLayout from "../../ui/Layout/PageLayout";

export default function PriceTracker({ prices }) {
  const [tabs] = useState(["Bitcoin", "Ethereum"]);

  return (
    <PageLayout tabs={tabs}>
      <PriceCheckerLayout
        currency={"Bitcoin"}
        prices={prices.bitcoin}
        currentPrice={prices.btcPrice}
      />
      <PriceCheckerLayout
        currency={"Ethereum"}
        prices={prices.ethereum}
        currentPrice={prices.ethPrice}
      />
    </PageLayout>
  );
}
