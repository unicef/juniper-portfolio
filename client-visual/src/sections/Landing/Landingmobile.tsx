import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { ReceiveMobile } from './Receive/Receive'
import { InvestMobile } from './Invest/Invest'
import { TrackMobile } from './Track/Track'
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
    width: '80%',
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

export const Landingmobile = () => {
    const classes = useStyles()
    const [landingText] = useState('A new financial vehicle allowing UNICEF to receive, hold and disburse cryptocurrency—a first for the UN.')
    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <Grid container>
                    <Grid item>
                        <span className={classes.landingText}>{landingText}</span>
                    </Grid>
                </Grid>
                <div style={{ paddingBottom: '200px', paddingTop: '30px' }}>
                    <ReceiveMobile />
                </div>
                <div style={{ paddingBottom: '200px' }}>
                    <InvestMobile />
                </div>
                <div style={{ paddingBottom: '200px' }}>
                    <TrackMobile />
                </div>

            </div>
            <Footer />
          
        </div>
    )

}

