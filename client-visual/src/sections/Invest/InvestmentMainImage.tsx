import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid, useMediaQuery } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => ({
    desktop: {
        paddingTop: '59px',
    },
    mobile: {
        paddingTop: '59px',
        width: '70%',
    },
}));

export const InvestmentMainImage = () => {
    const classes = useStyles()
    const mobiledevice = useMediaQuery('(max-width: 700px)');

    if (mobiledevice)
    {
       return (
            <img className={classes.mobile} src='Invest_illustration.svg' alt='receive info' /> 
        )
    }
    else
    {
      return(
        <Grid container>
            <Grid item xs={3} sm={3}>
                <img className={classes.desktop} src='Invest_illustration.svg' alt='receive info' />
            </Grid>
        </Grid>  
      )  
    }
}