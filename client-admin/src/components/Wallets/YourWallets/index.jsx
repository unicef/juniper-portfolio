import React, { Fragment } from "react";
import YourWalletsContent from "./YourWalletsContent";
import WalletDetails from "../WalletDetails";
import { Route } from "react-router-dom";
// TODO: Add State/API calls/routes
export default class YourWallets extends React.Component {
  render() {
    return (
      <Fragment>
        <Route path="/" exact>
          <YourWalletsContent />
        </Route>
        <Route path="/wallets" exact>
          <YourWalletsContent />
        </Route>
        <Route path="/wallets/:id">
          <WalletDetails />
        </Route>
      </Fragment>
    );
  }
}
