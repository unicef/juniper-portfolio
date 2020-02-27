import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

const useStyles = makeStyles({
    root: {
      flexGrow:1,
    },
    imageSpecs: {
      width:'259px'
    },
    text: {
      width:'107px',
      height:'69px',
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
    trackText: {
      color:'#fff'
    },
  });

export const TrackObject = () => {
    const classes = useStyles()
    const [trackText] = useState('Track the movement of investments')
    return (
        // <div className={classes.root}>
        <Grid container>
            <Grid item xs={3} className={classes.text}>
              <div className={classes.trackText}>{trackText} donor(s)</div>
            </Grid>
            <Grid item xs={3}>
              <img className={classes.imageSpecs} src='./Infographic:track:mobile.png' alt='ratio of crypto pie chart' />
            </Grid>
        {/* </div> */}
        </Grid>
    )
}