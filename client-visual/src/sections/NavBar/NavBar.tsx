import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: any) => ({
    root: {
      flexGrow: 1,
      justifyContent: 'center',
      height: 50,
      maxWidth: '100vw',
      left: 0,
      background: 'white', 
      boxShadow: 'none',
      fontFamily: ['Red Hat Display', 'sans-serif'].join(','),
      zIndex: 100,
    },
    toolBar: {
      minHeight: 50,
      '& > *:first-child, & > *:last-child': {
        width: '100%',
        maxWidth: 220,
      },
    },
    menuButtonWrapper: {
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-end',
    },
    menuButton: {
      marginRight: -15,
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
    },
  }));

export default function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.root} square={true} elevation={0} color='default' position="fixed">
        <Toolbar className={classes.toolBar}>
          <Typography variant="h5" className={classes.title}>
            CryptoFund
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}