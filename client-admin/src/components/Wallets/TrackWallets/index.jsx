import React, { Fragment } from "react";
import TrackWalletsContent from "./TrackWalletsContent";

export default class TrackWallets extends React.Component {
  render() {
    return (
      <Fragment>
        <TrackWalletsContent
          trackedWallets={this.props.trackedWallets}
          fetchTrackedWallets={this.props.fetchTrackedWallets}
          isAdmin={this.props.isAdmin}
          btcRate={this.props.btcRate}
          ethRate={this.props.ethRate}
        />
      </Fragment>
    );
  }
}
