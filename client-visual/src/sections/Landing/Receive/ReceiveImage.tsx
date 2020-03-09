import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

const useStyles = makeStyles({
    root: {
      flexGrow:1,
    },
    imageSpecs: {
      // width:'259px'
    },
    text: {
      // width:'107px',
      // height:'69px',
      fontFamily:'IBM Plex Sans',
      fontSize: '16px',
      fontWeight:'bold',
      fontStretch:'normal',
      fontStyle: 'normal',
      lineHeight:'1.44',
      letterSpacing:'normal',
      color:'#fff'
    },
    title: {
      textTransform:"uppercase",
      letterSpacing:'1.5px',
      fontSize:'14px',
      fontWeight:'normal'
    },
    numberOfDonors: {
      color:'#fff'
    },
    amountOfBitcoin: {
      color: '#ffd113'
    },
    amountOfEther: {
      color: '#13e7ff'
    }
  });

export const ReceiveImage = () => {
    const classes = useStyles()
    return (
            <Grid item xs={12} sm={2}>
              <img className={classes.imageSpecs} src='./Infographic:receive:mobile.png' alt='ratio of crypto pie chart' />
            </Grid>
    )
}