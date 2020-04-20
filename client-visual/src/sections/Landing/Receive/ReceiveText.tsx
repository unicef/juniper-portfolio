import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    root: {
      flexGrow:1,
    },
    receiveText: {
      fontFamily: 'Cabin',
      fontSize: '82px',
      fontWeight:'bold',
      fontStretch:'normal',
      lineHeight:'0.46',
      letterSpacing:'normal',
      color: '#fff',
      paddingLeft: '-5px'
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

export const ReceiveText = () => {
    const classes = useStyles()
    const [receiveText] = useState('Receive')
    const [subtitle] = useState('View the cryptocurrency received by UNICEF')
  return (
    <div>
      <div style={{ paddingBottom: '30px' }} className={classes.receiveText}>{receiveText}</div>
      <div className={classes.subtitle}>{subtitle}</div>
    </div>
    )
}