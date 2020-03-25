import React from 'react'
<<<<<<< HEAD
import { makeStyles } from '@material-ui/core'
import { Grid } from '@material-ui/core'
import { SideDetails } from '../../common/SideDetails'
import { AboutMainText } from './AboutMainText'

const useStyles = makeStyles((theme: any) => ({
    

    top: {
        backgroundColor: '#ffd113',
        padding: '100px 0px',
    },

    lcolumn: 
    {
        padding: '100px 65px 100px 130px',
    },

    rcolumn: {
        padding: '100px 130px 100px 65px',
    },

    largetext: 
    {
        fontFamily: 'Cabin',
        fontSize: '77px',
        fontWeight: 'bold',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: '1.04',
        letterSpacing: 'normal',
        color: '#0068ea',
    },
    
    header:
    {
        fontFamily: 'Cabin',
        fontSize: '28px',
        fontWeight: 'bold',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: '1.32',
        letterSpacing: 'normal',
        color: '#000000',
        paddingBottom: '10px',
    },

    blurb: {
        fontFamily: 'IBM Plex Sans',
        fontSize: '22px',
        lineHeight: '34px',
        letterSpacing: 'normal',
    },

    underline: {
        textDecoration: 'underline',
        fontWeight: 'bold',
    }
    
}))


export const About = () => {
    const classes = useStyles()
    return (
    <div>
        <div className={classes.top}>
            <AboutMainText/>
        </div>

        <div>
                <Grid container>
                    <Grid item sm={6} className={classes.lcolumn}>
                        <div className={classes.largetext}>Selection criteria &amp; funding</div>
                    </Grid>
                    
                    <Grid item sm={6} className={classes.rcolumn}>
                      <AboutBlurb1 />
                    </Grid>
                </Grid>

         </div>  

      </div>
    )
}

export const AboutBlurb1 = () => {
    const classes = useStyles();

    return (
        <div>
          <div className={classes.header}>Eligible applicants</div>
          <div className={classes.blurb}>
            <p>Projects selected by the <span className={classes.underline}>Innovation Fund</span> can 
            then apply to the CryptoFund, and the fund team reviews applications
            to make investments into projects. The selected projects receive 12 months of mentorship.</p>

            <p>UNICEF's Innovation Fund is a non-thematic, pooled fund which has been specifically
             designed to finance early stage, open-source technology that can benefit children. The core
             motivation of the Innovation Fund is to identify "clusters" or portfolios of
             initiatives around emerging technology - so that UNICEF can both shape markets
             and learn about and guide these technologies to benefit children. We invest in
             solutions that can impact the lives of the most vulnerable children.</p>   
        </div> 
        </div>
=======

export const About = () => {
    return (
        <h1>About</h1>
>>>>>>> origin/master
    )
}