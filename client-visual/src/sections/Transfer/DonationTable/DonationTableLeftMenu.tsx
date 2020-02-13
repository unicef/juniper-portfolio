import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

const useStyles = makeStyles({
    list: {
      width: '244px',
      height:'100%',
      backgroundColor: '#0068ce',
    },
    fullList: {
      width: 'auto',
    },
    mainText: {
      fontFamily: 'Cabin',
      fontSize: '12px',
      fontWeight: 'bold',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 'normal',
      letterSpacing: '1px',
      color: '#ffffff',
      textTransform:'uppercase'
    },
    numberText: {
      fontFamily: 'IBM Plex Sans',
      fontSize: '21px',
      fontWeight: 'bold',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: '1.76',
      letterSpacing: 'normal',
      color: '#ffffff',
      textTransform:'uppercase'
    },
    labelText: {
      fontFamily: 'Cabin',
      fontSize: '10px',
      fontWeight: 'bold',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 'normal',
      letterSpacing: '0.83px',
      color: '#ffffff',
      textTransform:'uppercase'
    },
    textWrapper: {
      marginLeft:'38px',
      marginTop: '67px'
    }
  });

  
export const DonationTableLeftMenu = () => {
    const classes = useStyles();
    const [state, setState] = React.useState({
        left: true,
    });
    
    const sideList = (side:any) => (
        <div
          className={classes.list}
          role="presentation"
        >
          <div className={classes.textWrapper}>
            <span className={classes.mainText}>Crypto Received</span><br/>
            <span className={classes.numberText}>03</span><br/>
            <span className={classes.labelText}>Donors</span><br/>
            <span className={classes.numberText}>90 BTC</span><br/>
            <span className={classes.labelText}>Bitcoin Received</span><br/>
            <span className={classes.numberText}>25000 ETH</span><br/>
            <span className={classes.labelText}>Ether Received</span><br/>
          </div>
          <div className={classes.textWrapper}>
            <span className={classes.mainText}>Crypto Invested</span><br/>
            <span className={classes.numberText}>08</span><br/>
            <span className={classes.labelText}>Investments</span><br/>
            <span className={classes.numberText}>90 BTC</span><br/>
            <span className={classes.labelText}>Bitcoin Invested</span><br/>
            <span className={classes.numberText}>25000 ETH</span><br/>
            <span className={classes.labelText}>Ether Invested</span><br/>
          </div>
        </div>
      );
    
    return (
        <div>
            <Drawer variant="permanent" open={state.left}>
                {sideList('left')}
            </Drawer>
        </div>
    )
}