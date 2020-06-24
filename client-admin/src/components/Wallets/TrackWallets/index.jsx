import React, { Fragment } from "react";
import TrackWalletsContent from "./TrackWalletsContent";
// TODO: Add State/API calls/routes
export default class YourWallets extends React.Component {
  render() {
    return (
      <Fragment>
        <TrackWalletsContent getExchangeRate={this.props.getExchangeRate} />
      </Fragment>
    );
  }
}
