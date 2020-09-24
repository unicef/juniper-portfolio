import React, { useEffect, useState } from "react";
import YourWallets from "./YourWallets";
import TrackWallets from "./TrackWallets";
import PageLayout from "../../ui/Layout/PageLayout";

export default function Wallets({
  wallets,
  trackedWallets,
  summary,
  fetchWallets,
  fetchTrackedWallets,
  isAdmin,
  btcRate,
  ethRate,
}) {
  const [tabs] = useState(["Your Wallets", "Track Wallets"]);

  return (
    <PageLayout tabs={tabs}>
      <YourWallets
        wallets={wallets}
        summary={summary}
        fetchWallets={fetchWallets}
        isAdmin={isAdmin}
        btcRate={btcRate}
        ethRate={ethRate}
      />
      <TrackWallets
        isAdmin={isAdmin}
        trackedWallets={trackedWallets}
        fetchTrackedWallets={fetchTrackedWallets}
        btcRate={btcRate}
        ethRate={ethRate}
      />
    </PageLayout>
  );
}
