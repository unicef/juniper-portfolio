import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Button } from '@material-ui/core'

const useStyles = makeStyles({
    root: {
        paddingTop:'100px',
        maxWidth:'100%',
        padding: '14px', 
        width: '80%',
    },
    backgroundTitle:{
        fontFamily:'Cabin',
        fontSize:'28px',
        fontWeight:'bold',
        fontStretch:'normal',
        fontStyle:'normal',
        lineHeight:'1.64',
        letterSpacing:'normal',
        color:'#000', 
        paddingBottom: '15px',
    },
    backgroundText: {
        fontFamily:'IBM Plex Sans',
        fontSize:'22px',
        fontWeight:'normal',
        fontStretch:'normal',
        fontStyle:'normal',
        lineHeight:'1.55',
        letterSpacing:'normal',
        color:'#000'
    },
    donationQueryButton: {
        marginTop: '25px',
        width: '195px',
        height: '50px',
        borderRadius: '5px',
        backgroundColor: '#0068ea'
    },
    donationQueryButtonText: {
        fontFamily: 'Cabin',
        fontSize: '14px',
        fontWeight: 'bold',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 'normal',
        letterSpacing: '1.17px',
        textAlign: 'center',
        color: '#ffffff'
    }
})
export const DonorText = () => {
    const classes = useStyles()
    const [backgroundTitle] = useState(
        "Our donors"
    )
    const [donorText1] = useState(
        'In line with current UNICEF practice, each crypto transaction is initiated after UNICEF has completed due diligence on a donor, ensuring a credible source of the donation.'
    )
    const [donorText2] = useState(
        'We would like to tank our donors supporting the CryptoFund: Ethereum foundation. If you are interested in making a donation in crypto, please write to us.'
    )
    return(
        <div className={classes.root}>
            <div className={classes.backgroundTitle}>{backgroundTitle}</div>
            <div className={classes.backgroundText}>{donorText1}</div><br/>
            <div className={classes.backgroundText}>{donorText2}</div>
            <Button href='mailto:blockchain@unicef.org' className={classes.donationQueryButton}>
                <span className={classes.donationQueryButtonText}>Donation Query</span>
            </Button>
        </div>
    )
}