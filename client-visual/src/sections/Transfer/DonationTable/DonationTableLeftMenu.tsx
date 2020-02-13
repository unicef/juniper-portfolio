import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

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
      // const toggleDrawer = (side: any, open: any) => (event: any) => {
      //   if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      //     return;
      //   }
    
      //   setState({ ...state, [side]: open });
      // };
    
    return (
        <div>
            {/* <Button onClick={toggleDrawer('left', true)}>Open Left</Button> */}
            {/* <Drawer open={state.left} onClose={toggleDrawer('left', false)}> */}
            <Drawer open={state.left}>
                {sideList('left')}
            </Drawer>
        </div>
    )
}