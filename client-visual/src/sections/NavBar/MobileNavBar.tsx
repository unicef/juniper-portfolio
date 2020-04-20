import React from 'react'
import { useLocation } from 'react-router-dom'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { MobileOpenNavigation } from './MobileOpenNavigation'

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
        minHeight: 79,
        padding: '0px 50px',
    },
    menulink: {
        textDecoration: 'none',
        color: 'black',
    },
    menulinkhome: {
        textDecoration: 'none',
        color: 'white',
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
  }));

export const MobileNavBar = () => {
    const classes = useStyles()
    const location = useLocation()
    const [open, setOpen] = React.useState(false)
    const handleClick = () => {
        console.log('hi')
        setOpen(!open)
    }
    const home = (location.pathname == "/");
    return(
        <React.Fragment>
            <AppBar square={true} elevation={0} style={{boxShadow: home ? 'none' : '0 2px 4px 0 rgba(0, 0, 0, 0.12)' }} color={home ? 'primary' : 'secondary'} position="fixed">
                <Toolbar className={classes.toolBar}>
                    <a className = {home ? classes.menulinkhome : classes.menulink} href = '/'>
                        <Typography variant="h5" className={classes.title}>
                            CryptoFund
                        </Typography>
                    </a>
                    { !open ?
                        ( home ? 
                            null :
                            <img onClick={handleClick} style={{position: 'absolute', right: '50px', }} src='Hamburger_black.svg' alt='hamburger icon' /> 
                        )
                        : 
                        (
                            home ? 
                            <img onClick={handleClick} style={{position: 'absolute', right: '50px', }} src='Cross_blue.svg' alt='cross icon' /> :
                            <img onClick={handleClick} style={{position: 'absolute', right: '50px', }} src='Cross_black.svg' alt='cross icon' /> 
                        )
                    }
                </Toolbar>
            </AppBar>
            {
                open ? 
                (<MobileOpenNavigation />) : (null)
            }
        </React.Fragment>
    )
}