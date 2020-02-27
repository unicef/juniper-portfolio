import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Receive } from './Receive/Receive'
import { Invest } from './Invest/Invest'
import { Track } from './Track/Track'

const useStyles = makeStyles({
    root: {
      flexGrow:1,
      paddingLeft:'286px',
      paddingRight: '286px',
      paddingTop: '20px',
      backgroundColor: '#0068ea' 
    },
    landingText: {
      fontFamily: 'Cabin',
      fontSize: '39px',
      fontWeight:'normal',
      fontStretch:'normal',
      lineHeight:'normal',
      letterSpacing:'normal',
      color:'#fff',
      width: '869px',
      height: '96px'
    }
  });

export const Landing = () => {
    const classes = useStyles()
    const [landingText] = useState('A new financial vehicle allowing UNICEF to receive, hold and disburse cryptocurrency—a first for the UN.')
    return (
        <div className={classes.root}>
            <span className={classes.landingText}>{landingText}</span>
            <Receive/>
            <Invest/>
            <Track/>
        </div>
    )
}