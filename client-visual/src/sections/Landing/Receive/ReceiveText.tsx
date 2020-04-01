import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

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
      color: '#fff',
      paddingTop: '20px',
    }
  });

export const ReceiveText = () => {
    const classes = useStyles()
    const [receiveText] = useState('Receive')
    return (
        <Grid item xs={12} sm={12} md={4}>
          <div style={{paddingLeft:'-5px', paddingBottom:'30px'}} className={classes.receiveText}>{receiveText}</div>

        </Grid>
    )
}