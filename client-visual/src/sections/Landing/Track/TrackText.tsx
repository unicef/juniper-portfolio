import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

const useStyles = makeStyles({
    root: {
      flexGrow:1,
    },
    trackText: {
      fontFamily: 'Cabin',
      fontSize: '92px',
      fontWeight:'bold',
      fontStretch:'normal',
      lineHeight:'0.46',
      letterSpacing:'normal',
      color:'#fff',
      paddingLeft: '-5px',
      paddingTop: '20px',
   
    }, 

    subtitle:
  {
    fontFamily: 'IBM Plex Sans',
    fontSize: '16px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.44',
    letterSpacing: 'normal',
    color: '#fff',
    padding: '0px 30px 40px 5px',

  },
  });

export const TrackText = () => {
    const classes = useStyles()
  const [trackText] = useState('Track')
  const [subtitle] = useState('View the movement of cryptocurrency')
  return (
    <div>
      <div style={{paddingLeft:'-5px', paddingBottom:'30px'}} className={classes.trackText}>{trackText}</div>
      <div className={classes.subtitle}>{subtitle}</div>
    </div>
    )
}