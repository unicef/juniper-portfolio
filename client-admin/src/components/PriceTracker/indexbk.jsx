import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import MainContentContainer from '../../ui/MainContentContainer'
import { fetchPrices } from './fetchPrices';
import PriceBar from '../PriceBar'


const useStyles = makeStyles({
  
  root:
  {
    marginTop: '20px',
    backgroundColor: '#f8f8f8',
  },
  
});


class PriceTracker extends React.Component {
    render() {
        if (this.props.loading) return 'Loading...';
        if (this.props.error) return `Error: ${this.props.error}`;

        return (
            <MainContentContainer>
                <PriceBar />
                Bitcoin Price Tracker
            </MainContentContainer>
        )
    }
}


export default fetchPrices(PriceTracker);