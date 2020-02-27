import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    root: {
      flexGrow:1,
    },
    trackText: {
      fontFamily: 'Cabin',
      fontSize: '75px',
      fontWeight:'bold',
      fontStretch:'normal',
      lineHeight:'0.46',
      letterSpacing:'normal',
      color:'#fff',
      width: '347px',
      height: '47px'
    }
  });

export const TrackText = () => {
    const classes = useStyles()
    const [trackText] = useState('Track')
    return (
        <div className={classes.root}>
            <span className={classes.trackText}>{trackText}</span>
        </div>
    )
}