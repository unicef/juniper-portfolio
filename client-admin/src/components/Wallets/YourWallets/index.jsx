import React, { Fragment } from "react";
import YourWalletsContent from "./YourWalletsContent";
import WalletDetails from "../WalletDetails";

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
        {walletDetailsAddress ? (
          <WalletDetails
            viewWalletDetails={this.viewWalletDetails}
            walletDetailsAddress={this.state.walletDetailsAddress}
            btcRate={this.props.btcRate}
            ethRate={this.props.ethRate}
          />
        ) : (
          <YourWalletsContent
            wallets={this.props.wallets}
            fetchWallets={this.props.fetchWallets}
            viewWalletDetails={this.viewWalletDetails}
            isAdmin={this.props.isAdmin}
            btcRate={this.props.btcRate}
            ethRate={this.props.ethRate}
          />
        )}
      </Fragment>
    );
  }
}
