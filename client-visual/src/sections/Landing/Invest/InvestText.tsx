import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    root: {
      flexGrow:1,
    },
    investText: {
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

export const InvestText = () => {
    const classes = useStyles()
    const [investText] = useState('Invest')
    return (
        <div className={classes.root}>
            <span className={classes.investText}>{investText}</span>
        </div>
    )
}