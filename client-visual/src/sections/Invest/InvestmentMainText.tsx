import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { useMediaQuery } from '@material-ui/core';


const useStyles = makeStyles((theme: any) => ({
    mainText: {
        fontFamily: 'Cabin',
        fontSize: '32px',
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: '1.44',
        letterSpacing: 'normal',
        color: '#ffffff', 
        width: '80%',
    },
    mobile: {
        fontFamily: 'Cabin',
        fontSize: '24px',
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: '1.44',
        letterSpacing: 'normal',
        color: '#ffffff', 
    }
}));
export const InvestmentMainText = () => {
    const classes = useStyles()
    const mobileDevice = useMediaQuery('(max-width: 800px)');

    const [mainText] = useState(
        'The CryptoFund aspires to create visibility for the donor and the public, adding a layer of transparent accounting to the donations ecosystem by deploying cryptocurrency. Below is a simple tool that provides a snapshot of all transfers, from donor to startups.'
    )
    return(
        <div className={mobileDevice ? classes.mobile : classes.mainText}>
            { mainText }
        </div>
    )
}