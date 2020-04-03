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
      paddingTop: '50px',
      backgroundColor: '#0068ea' ,
    padding: '14px',
  },
  
  container:
  {
    width: '65%',
    margin: 'auto', 
  },

  
    landingText: {
      fontFamily: 'Cabin',
      fontSize: '39px',
      fontWeight:'normal',
      fontStretch:'normal',
      lineHeight:'normal',
      letterSpacing:'normal',
      color:'#fff',
      height: '96px',
      paddingBottom: '30px',
    }
  });

export const Landing = () => {
    const classes = useStyles()
    const [landingText] = useState('A new financial vehicle allowing UNICEF to receive, hold and disburse cryptocurrency—a first for the UN.')
    return (
      <div className={classes.root}>
        <div className = {classes.container}>
          <Grid container>   
            <Grid item>
              <span className={classes.landingText}>{landingText}</span>
            </Grid>
          </Grid>
        <div style={{ paddingBottom: '30px' }}>
            <Receive/>
          </div>
          <div style={{ paddingBottom: '30px' }}>
            <Invest/>
          </div>
          <div style={{paddingBottom: '30px'}}>
            <Track/>
          </div>

          </div>
          <Footer />
          
        </div>
    )
}