import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => ({
    root: {
      flexGrow: 1,
      justifyContent: 'center',
      height: 50,
      // maxWidth: '100vw',
      left: 0,
      background: 'white', 
      boxShadow: 'none',
      fontFamily: 'Cabin',
      zIndex: 100,
    },
    toolBar: {
      minHeight: 50,
      // '& > *:first-child, & > *:last-child': {
      //   width: '100%',
      //   maxWidth: 220,
      // },
    },
    menuButtonWrapper: {
      width: '100%',
      display: 'flex',
      // justifyContent: 'flex-end',
      justifyContent: 'center',
      alignItems: 'center',
    },
    menuButton: {
      fontFamily: 'Cabin', 
      fontWeight:'bold', 
      letterSpacing: '1.17px'
    },
    menuButtonLeft: {
      fontFamily: 'Cabin', 
      fontWeight:'bold', 
      letterSpacing: '1.17px'
    },
    title: {
      width: '133px',
      height: '32px',
      fontFamily: 'Cabin',
      fontSize: '26px',
      fontWeight: 'bold',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 'normal',
      letterSpacing: 'normal',
      color: '#000000'
    }
  }));

export default function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar square={true} elevation={0} color='default' position="fixed">
        <Toolbar className={classes.toolBar}>
          <Typography variant="h5" className={classes.title}>
            CryptoFund
          </Typography>
          <div className={classes.menuButtonWrapper}>
            <Button 
              // className={classes.menuButtonLeft} 
              href='/receive'
            >
              Receive
            </Button>
            <Button 
              // className={classes.menuButton} 
              href='/invest'
            >
              Invest
            </Button>
            <Button 
              // className={classes.menuButton} 
              href='/track'
            >
              Track
            </Button>
            {/* <Button className={classes.menuButton} href='/about'>About</Button> */}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}