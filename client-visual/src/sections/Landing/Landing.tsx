import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Receive } from './Receive/Receive'
import { Invest } from './Invest/Invest'
import { Track } from './Track/Track'
import { Grid } from '@material-ui/core'
import Footer from '../Footer/Footer';

const useStyles = makeStyles({
    root: {
      flexGrow:1,
      // paddingLeft:'286px',
      // paddingRight: '286px',
      paddingTop: '20px',
      backgroundColor: '#0068ea' ,
      padding:'14px'
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
          <Grid container >
            <Grid item xs={12} sm={3}></Grid>
            <Grid item xs={12} sm={8}>
              <span className={classes.landingText}>{landingText}</span>
            </Grid>
          </Grid>
          <div style={{paddingBottom: '30px'}}>
            <Grid container>
              <Grid item xs={12} sm={3}></Grid>
              <Grid item xs={12} sm={8}>
                <Receive/>
              </Grid>
            </Grid>
          </div>
          <div style={{paddingBottom: '30px'}}>
            <Grid container>
              <Grid item xs={12} sm={3}></Grid>
              <Grid item xs={12} sm={8}>
                <Invest/>
              </Grid>
            </Grid>
          </div>
          <div style={{paddingBottom: '30px'}}>
            <Grid container>
              <Grid item xs={12} sm={3}></Grid>
              <Grid item xs={12} sm={8}>
                <Track/>
              </Grid>
            </Grid>
          </div>
          <Footer />
        </div>
    )
}