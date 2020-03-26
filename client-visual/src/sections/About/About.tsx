import React from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles} from '@material-ui/styles'
import { AboutMainText } from './AboutMainText'
import {ApplicationImg, ApplicationMiddleImg} from './AboutImgs'

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
        paddingBottom: '60px'
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
                        <ApplicationImg />
                        <AboutBlurb2 />
                        <AboutBlurb3 />
                        <AboutBlurb4 />
                    </Grid>
                </Grid>
                <ApplicationMiddleImg />
                <Grid container>
                    <Grid item sm={6} className={classes.lcolumn}>
                        <div className={classes.largetext}>Why blockchain?</div>
                    </Grid>
                    
                    <Grid item sm={6} className={classes.rcolumn}>
                        <AboutBlurb5 />
                        <AboutBlurb6 />
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
    )
}


export const AboutBlurb2 = () => {
    const classes = useStyles();
    
    return (
        <div>
            <div className={classes.header}>Funding in bitcoin or ether</div>
            <div className={classes.blurb}>
                <p>The CryptoFund can help with investments up to $100,000 USD
                    (BTC or ETH equivalent) to support the acceleration of your company's work.</p>
            </div>
        </div>
    )
}


export const AboutBlurb3 = () => {
    const classes = useStyles();
    
    return (
        <div>
            <div className={classes.header}>Funding open source projects</div>
            <div className={classes.blurb}>
                <p>We are seeking open-source projects that have already been started -
                    you've been running it for a while - it shows some positive indicators - 
                    but you need funding to take it to a level where it can really attract additional
                    investment and funding by generating real data.
                </p>
            </div>
        </div>
    )
}

export const AboutBlurb4 = () => {
    const classes = useStyles();
    
    return (
        <div>
            <div className={classes.header}>Scaling up your projects</div>
            <div className={classes.blurb}>
                <p>You might need a small amount of money to get your prototype to the stage
                    where the company has proof that the solution works for other people. Maybe 
                    another developer or two are needed, design help to communicate what the project
                    can do, or some server space. Refactoring something into a new language because 
                    the original one won't scale. Testing it in a new area. Getting some data points.
                </p>
            </div>
        </div>
    )
}


export const AboutBlurb5 = () => {
    const classes = useStyles();
    
    return (
        <div>
            <div className={classes.header}>Enabling a digitally financed future</div>
            <div className={classes.blurb}>
                <p>By distributing funding in cryptocurrency, UNICEF, donors, recipients,
                    and the public can track where the money is going and how it is being spent,
                    providing an unprecedented level of transparency in the funding and NGO space.
                    This is due to blockchain technology, the tool powering cryptocurrency.
                </p>
            </div>
        </div>
    )
}


export const AboutBlurb6 = () => {
    const classes = useStyles();
    
    return (
        <div>
            <div className={classes.header}>A permanent, transparent record of a financial transaction</div>
            <div className={classes.blurb}>
                <p>Blockkchain technology operates as a digital ledger, recording each transaction which
                    takes place on the network. With public cryptocurrencies such as bitcoin and ether, anyone is
                    able to see where and when the assets are moving, revolutionizing the way giving today works.
                </p>
            </div>
        </div>
    )
}