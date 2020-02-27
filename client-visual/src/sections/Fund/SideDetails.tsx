import React from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme: any) => ({
    donorNumber: {
        fontFamily: 'IBM Plex Sans',
        fontSize: '28px',
        fontWeight: 'bold',
        lineHeight: '1.32',
        color: '#fff'
    },
    donorLabel: {
        fontFamily: 'Cabin',
        fontSize: '14px',
        fontWeight: 'bold',
        lineHeight: 'normal',
        letterSpacing:'1.17px',
        color: '#fff',
        textTransform:'uppercase'
    },
    etherNumber: {
        fontFamily: 'IBM Plex Sans',
        fontSize: '28px',
        fontWeight: 'bold',
        lineHeight: '1.32',
        color: '#13e7ff',
        textTransform:'uppercase'
    },
    etherLabel: {
        fontFamily: 'Cabin',
        fontSize: '14px',
        fontWeight: 'bold',
        lineHeight: 'normal',
        letterSpacing:'1.17px',
        color: '#13e7ff',
        textTransform:'uppercase'
    },
    bitcoinNumber: {
        fontFamily: 'IBM Plex Sans',
        fontSize: '28px',
        fontWeight: 'bold',
        lineHeight: '1.32',
        color: '#ffd113',
        textTransform:'uppercase'
    },
    bitcoinLabel: {
        fontFamily: 'Cabin',
        fontSize: '14px',
        fontWeight: 'bold',
        lineHeight: 'normal',
        letterSpacing:'1.17px',
        color: '#ffd113',
        textTransform:'uppercase'
    }
}))

export const SideDetails = () => {
    const classes = useStyles()

    return(
        <div>
            <div className={classes.donorNumber}>01</div>
            <div className={classes.donorLabel}>donors</div>
            <div style={{marginTop:'15px'}} className={classes.etherNumber}>100 eth</div>
            <div className={classes.etherLabel}>ether received</div>
            <div style={{marginTop:'15px'}} className={classes.bitcoinNumber}>01 btc</div>
            <div className={classes.bitcoinLabel}>bitcoin received</div>
        </div>
    )
}