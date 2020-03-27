import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid } from '@material-ui/core'


const useStyles = makeStyles((theme: any) => ({

    root: {
        marginTop: '-50px',
    },
    
    appimg: {
        paddingBottom: '60px',
        width: '100%',
    },

    rightimg: {
        width: '100%',
    },

    yellowpanel: 
    {
        width: '814px',
        opacity: '0.84',
        padding:'14px',
        height: '296px',
        backgroundColor: '#ffd113',
        marginTop: '103px',
    },

    paneltext: 
    {
        fontFamily: 'Cabin',
        fontSize: '28px',
        lineHeight: '37px',
        color: '#000000',
        letterSpacing: 'normal',
        padding: '40px 100px 40px 130px'
    }
}))

export const ApplicationImg = () => {
    const classes = useStyles();

    return (
        <img className={classes.appimg} src="Applicationprocess.svg" alt='Application Process'/>
    )
}

export const ApplicationMiddleImg = () => {
    const classes = useStyles();
    return (
        <div>
        <Grid container className={classes.root}>
            <Grid item sm={6}>
                    <div className={classes.yellowpanel}>
                        <div className={classes.paneltext}> 
                              Do you have an early stage project that needs funding in Cryptocurrency?
                        </div>
                    </div>

            </Grid>

                
            <Grid item sm={6}>
                <img className = {classes.rightimg} src = 'About_Apply.jpg' alt='Girls with tablets'/>
            </Grid>

        </Grid>
        </div>
    )
}