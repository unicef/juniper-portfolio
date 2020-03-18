import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import { DonationTableStepper } from './DonationTableStepper'
const useStyles = makeStyles({
    root: {
    flexGrow: 1,
    minHeight: '100%',
    position: 'relative',
    },
    list: {
      width: '244px',
      height:'100%',
      backgroundColor: '#0068ce',
      display:'inline-block',
      position:'absolute'
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
    },
  });

  
export const DonationTableLeftMenu = () => {
    const classes = useStyles();
    const [state] = React.useState({
        left: true,
    });
    
    const sideList = (side:any) => (
      <Slide style={{display:'inline-block'}} direction="right" in={state.left} >
        
        <div
          className={classes.list}
          role="presentation"
        >
          <div className={classes.textWrapper}>
            <span className={classes.mainText}>Crypto Received</span><br/>
            <span className={classes.numberText}>1</span><br/>
            <span className={classes.labelText}>Donor</span><br/>
            <span className={classes.numberText}>1 BTC</span><br/>
            <span className={classes.labelText}>Bitcoin Received</span><br/>
            <span className={classes.numberText}>100 ETH</span><br/>
            <span className={classes.labelText}>Ether Received</span><br/>
          </div>
          <div className={classes.textWrapper}>
            <span className={classes.mainText}>Crypto Invested</span><br/>
            <span className={classes.numberText}>03</span><br/>
            <span className={classes.labelText}>Investments</span><br/>
            <span className={classes.numberText}>1 BTC</span><br/>
            <span className={classes.labelText}>Bitcoin Invested</span><br/>
            <span className={classes.numberText}>99 ETH</span><br/>
            <span className={classes.labelText}>Ether Invested</span><br/>
          </div>
          </div>
        </Slide>
      );
    
    return (
        <div className={classes.root}>
            {sideList('left')}
            <DonationTableStepper />
        </div>
    )
}