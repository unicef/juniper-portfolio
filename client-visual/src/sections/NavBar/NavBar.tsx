import React from 'react'
import {useLocation} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, Button, useMediaQuery, Menu, MenuItem} from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import json2mq from 'json2mq'
import { MobileNavBar } from './MobileNavBar'

const useStyles = makeStyles((theme: any) => ({
    root: {
      flexGrow: 1,
      justifyContent: 'center',
      height: 50,
      left: 0,
      boxShadow: 'none',
      fontFamily: 'Cabin',
    zIndex: 100,
  },
  

    toolBar: {
      minHeight: 50,
      padding: '0px 50px',
    },
    menuButtonWrapper: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      width: '133px',
      height: '32px',
      fontFamily: 'Cabin',
      fontSize: '24px',
      fontWeight: 'normal',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 'normal',
      letterSpacing: 'normal',
    },
    button: {
      fontFamily: 'Cabin',
      fontSize: '14px',
      fontWeight: 'bold',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 'normal',
      letterSpacing: '1.17px',
  },
    
  buttonhome: {
    fontFamily: 'Cabin',
    fontSize: '14px',
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: '1.17px',
    position: 'absolute',
    right: '50px',
    color: 'white',
    },
    
  displaynone: {
    display: 'none',
    },
    
    menulink: 
    {
      textDecoration: 'none',
      color: 'black',
  },

    menulinkhome: {
      textDecoration: 'none',
      color: 'white',
    },
    
     
  }));

export default function NavBar() {
  const classes = useStyles();
  const matches = useMediaQuery(
    json2mq({
      minWidth: 700
    })
  )
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  
  const location = useLocation();
  const home = (location.pathname == "/");
  const about = (location.pathname == "/about");
  const receive = (location.pathname == '/receive');
  const invest = (location.pathname == '/invest');
  const track = (location.pathname == "/track");

  return (
    <div className={classes.root}>
      {
        !matches ? (
          <MobileNavBar />
        ) : (
          <AppBar square={true} elevation={0} style={{boxShadow: home ? 'none' : '0 2px 4px 0 rgba(0, 0, 0, 0.12)' }} color={home ? 'primary' : 'secondary'} position="fixed">
            <Toolbar className={classes.toolBar}>
              <a className = {home ? classes.menulinkhome : classes.menulink} href = '/'>
              <Typography variant="h5" className={classes.title}>
                CryptoFund
              </Typography>
              </a>
                    <>
                        <div className={home ? classes.displaynone : classes.menuButtonWrapper }>
                          <Button href='/receive' className={classes.button} style={{color: receive ?  'blue' : 'black'}}>Receive</Button>
                          <Button href='/invest' className={classes.button} style={{color: invest ?  'blue' : 'black'}} >Invest</Button>
                          <Button href='/track' className={classes.button} style={{color: track ?  'blue' : 'black'}} >Track</Button>
                        </div>
                      <Button  className={home ? classes.buttonhome : classes.button} style={{ color: about ?  'blue' : 'inherit'}}href='/about'>About</Button>
                </>
            </Toolbar>
          </AppBar>
        )
      }
    </div>
  );
}