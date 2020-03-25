import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, Button, useMediaQuery, Menu, MenuItem} from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import json2mq from 'json2mq'

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
      fontSize: '26px',
      fontWeight: 'bold',
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
      letterSpacing: '1.17px'
    }
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

  return (
    <div className={classes.root}>
      <AppBar square={true} elevation={0} color='default' position="fixed">
        <Toolbar className={classes.toolBar}>
          <Typography variant="h5" className={classes.title}>
            CryptoFund
          </Typography>
          {
            !matches ? (
              <>
                <IconButton onClick={handleClick} style ={{marginLeft: 'auto'}} edge="end" color="inherit" aria-label="open drawer">
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  keepMounted
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}> <a style={{textDecoration:'none', color:'black'}} href='/' >Home</a></MenuItem>
                  <MenuItem onClick={handleClose}> <a style={{textDecoration:'none', color:'black'}} href='/receive' >Receive</a></MenuItem>
                  <MenuItem onClick={handleClose}> <a style={{textDecoration:'none', color:'black'}} href='/invest' >Invest</a></MenuItem>
                  <MenuItem onClick={handleClose}> <a style={{textDecoration:'none', color:'black'}} href='/track'>Track</a></MenuItem>
                  <MenuItem onClick={handleClose}> <a style={{textDecoration:'none', color:'black'}} href='/about' >About</a></MenuItem>
                </Menu>
              </>
          ) : (
            <>
              <div className={classes.menuButtonWrapper}>
                <Button 
                  href='/receive'
                  className={classes.button}
                >
                  Receive
                </Button>
                <Button 
                  href='/invest'
                  className={classes.button}
                >
                  Invest
                </Button>
                <Button 
                  href='/track'
                  className={classes.button}
                >
                  Track
                </Button>
              </div>
              <Button 
                className={classes.button}
                href='/about'
              >
                About
              </Button>
            </>
          )
        }
        </Toolbar>
      </AppBar>
    </div>
  );
}