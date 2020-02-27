import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    root: {
      flexGrow:1,
    },
    receiveText: {
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

export const ReceiveText = () => {
    const classes = useStyles()
    const [receiveText] = useState('Receive')
    return (
        <div className={classes.root}>
            <span className={classes.receiveText}>{receiveText}</span>
        </div>
    )
}