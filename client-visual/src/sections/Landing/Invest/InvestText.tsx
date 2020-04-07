import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

const useStyles = makeStyles({
    root: {
      flexGrow:1,
    },
    investText: {
      fontFamily: 'Cabin',
      fontSize: '92px',
      fontWeight:'bold',
      fontStretch:'normal',
      lineHeight:'0.46',
      letterSpacing:'normal',
      color: '#fff',
      paddingTop: '25px',
      //padding: '30px 70px 30px 0px',
    }
  });

export const InvestText = () => {
    const classes = useStyles()
    const [investText] = useState('Invest')
    return (
    
        <div style={{paddingLeft:'-5px', paddingBottom:'30px'}} className={classes.investText}>{investText}</div>
    )
}