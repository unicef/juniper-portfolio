import React, { Fragment } from "react";
import YourWalletsContent from "./YourWalletsContent";
import WalletDetails from "../WalletDetails";
import { Switch, Route } from "react-router-dom";
export default class YourWallets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      walletDetailsAddress: null,
    };
  }

  viewWalletDetails = (walletDetailsAddress) => {
    this.setState({ walletDetailsAddress });
  };

  render() {
    const { walletDetailsAddress } = this.state;
    return (
      <Fragment>
        <Switch>
          <Route exact path="/admin/wallets">
            <YourWalletsContent
              wallets={this.props.wallets}
              summary={this.props.summary}
              fetchWallets={this.props.fetchWallets}
              viewWalletDetails={this.viewWalletDetails}
              isAdmin={this.props.isAdmin}
              btcRate={this.props.btcRate}
              ethRate={this.props.ethRate}
            />
          </Route>
          <Route path="/admin/wallets/transactions">
            <WalletDetails
              viewWalletDetails={this.viewWalletDetails}
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
