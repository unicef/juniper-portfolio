import React, { Fragment, useState, useEffect } from 'react'
import MainContentContainer from '../../ui/MainContentContainer'
import { fetchPrices } from './fetchPrices';

class PriceTracker extends React.Component {
    render() {
        if (this.props.loading) return 'Loading...';
        if (this.props.error) return `Error: ${this.props.error}`;

        return (
            <Fragment>
                <MainContentContainer>Price Tracker</MainContentContainer>
            </Fragment>
        )
    }
}


export default fetchPrices(PriceTracker);