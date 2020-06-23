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

  getExchangeRate = async (symbol) => {
    let res, price;
    try {
      res = await fetch(
        `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD`
      );
      price = await res.json();
    } catch (e) {
      console.log(e);
    }
    return price.USD;
  };

  render() {
    const { walletDetailsAddress } = this.state;
    return (
      <Fragment>
        {walletDetailsAddress ? (
          <WalletDetails
            viewWalletDetails={this.viewWalletDetails}
            walletDetailsAddress={this.state.walletDetailsAddress}
            getExchangeRate={this.getExchangeRate}
          />
        ) : (
          <YourWalletsContent
            viewWalletDetails={this.viewWalletDetails}
            getExchangeRate={this.getExchangeRate}
          />
        )}
      </Fragment>
    );
  }
}
