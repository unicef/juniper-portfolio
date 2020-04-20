import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    root: {
      flexGrow:1,
    },
    investText: {
      fontFamily: 'Cabin',
      fontSize: '82px',
      fontWeight:'bold',
      fontStretch:'normal',
      lineHeight:'0.46',
      letterSpacing:'normal',
      color: '#fff',
      paddingTop: '25px',
      //padding: '30px 70px 30px 0px',
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

export const InvestText = () => {
    const classes = useStyles()
  const [investText] = useState('Invest')
  const [subtitle] = useState('View the cryptocurrency invested by UNICEF')
    return (
      <div>
        <div style={{ paddingLeft: '-5px', paddingBottom: '30px' }} className={classes.investText}>{investText}</div>
        <div className={classes.subtitle}>{subtitle}</div>
      </div>
    )
}