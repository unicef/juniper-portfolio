import React, { Fragment } from "react";
import YourWalletsContent from "./YourWalletsContent";
import WalletDetails from "../WalletDetails";
import { Switch, Route } from "react-router-dom";
export default class YourWallets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <Switch>
          <Route exact path="/admin/wallets">
            <YourWalletsContent
              wallets={this.props.wallets}
              summary={this.props.summary}
              fetchWallets={this.props.fetchWallets}
              isAdmin={this.props.isAdmin}
              btcRate={this.props.btcRate}
              ethRate={this.props.ethRate}
            />
          </Route>
          <Route path="/admin/wallets/transactions/:address">
            <WalletDetails
              walletDetailsAddress={this.state.walletDetailsAddress}
              btcRate={this.props.btcRate}
              ethRate={this.props.ethRate}
              fetchWallets={this.props.fetchWallets}
            />
          </Route>
        </Switch>
      </Fragment>
    );
  }
}
