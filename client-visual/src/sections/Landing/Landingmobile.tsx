import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import Footer from '../Footer/Footer';
import { LandingMobileCard } from '../../common/LandingMobileCard'

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
                <div style={{paddingTop:'90px'}}>
                  <LandingMobileCard
                    title="Receive"
                    link="/receive"
                    lineOne="1 donor"
                    lineTwo="100 ether"
                    lineThree="1 bitcoin"
                    colorOne="#fff"
                    colorTwo="#ffd113"
                    colorThree="#13e7ff"
                    imageLink="./Receive_illustration.svg"
                  />
                </div>
                <div style={{paddingTop:'60px'}}>
                  <LandingMobileCard
                    title="Invest"
                    link="/invest"
                    lineOne="3 investments"
                    lineTwo="100 ether"
                    lineThree="1 bitcoin"
                    colorOne="#fff"
                    colorTwo="#ffd113"
                    colorThree="#13e7ff"
                    imageLink="./Invest_illustration.svg"
                  />
                </div>
                <div style={{paddingTop:'60px', paddingBottom:'60px'}}>
                  <LandingMobileCard
                    title="Track"
                    link="/track"
                    lineOne="Track the"
                    lineTwo="movement of"
                    lineThree="investments"
                    colorOne="#fff"
                    colorTwo="#fff"
                    colorThree="#fff"
                    imageLink="./Track_illustration.svg"
                  />
                </div>
            </div>
            <Footer />
          
        </div>
    )

}

