import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import PageLayout from "../templates/Page";
import YourWallets from "../templates/YourWallets";
import TrackWallets from "../templates/TrackWallets";

import WalletDetails from "../templates/WalletDetails";

export default function YourWalletsPage({
  wallets,
  trackedWallets,
  summary,
  fetchWallets,
  fetchTrackedWallets,
  isAdmin,
  btcRate,
  ethRate,
  setShowHelp,
}) {
  const [tabs] = useState(["Your Wallets", "Track Wallets"]);

  return (
    <PageLayout tabs={tabs}>
      <Switch>
        <Route exact path="/admin/">
          <YourWallets
            wallets={wallets}
            summary={summary}
            fetchWallets={fetchWallets}
            isAdmin={isAdmin}
            btcRate={btcRate}
            ethRate={ethRate}
            fetchWallets={fetchWallets}
            setShowHelp={setShowHelp}
          />
        </Route>
        <Route exact path="/admin/wallets">
          <YourWallets
            wallets={wallets}
            summary={summary}
            fetchWallets={fetchWallets}
            isAdmin={isAdmin}
            btcRate={btcRate}
            ethRate={ethRate}
            setShowHelp={setShowHelp}
          />
        </Route>
        <Route path="/admin/wallets/transactions/:address">
          <WalletDetails
            btcRate={btcRate}
            ethRate={ethRate}
            fetchWallets={fetchWallets}
          />
        </Route>
      </Switch>

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
