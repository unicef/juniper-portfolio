import React, { useState, useEffect } from "react";
import PriceCheckerLayout from "../../ui/Layout/PriceCheckerLayout";
import PageLayout from "../../ui/Layout/PageLayout";

export default function PriceTracker({ prices, btcRate, ethRate }) {
  const [tabs] = useState(["Bitcoin", "Ethereum"]);

  return (
    <PageLayout tabs={tabs}>
      <PriceCheckerLayout
        currency={"Bitcoin"}
        prices={prices.bitcoin}
        currentPrice={btcRate}
      />
      <PriceCheckerLayout
        currency={"Ethereum"}
        prices={prices.ethereum}
        currentPrice={ethRate}
      />
    </PageLayout>
  );
}
