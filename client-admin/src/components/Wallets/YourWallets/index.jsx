import React, { Fragment } from "react";
import YourWalletsContent from "./YourWalletsContent";
import WalletDetails from "./WalletDetails";

// TODO: Add State/API calls/routes
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
            getExchangeRate={this.props.getExchangeRate}
          />
        ) : (
          <YourWalletsContent
            viewWalletDetails={this.viewWalletDetails}
            getExchangeRate={this.props.getExchangeRate}
          />
        )}
      </Fragment>
    );
  }
}
