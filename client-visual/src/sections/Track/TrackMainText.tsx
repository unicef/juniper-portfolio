import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme: any) => ({
    mainText: {
        width: '723px',
        fontFamily: 'Cabin',
        fontSize: '32px',
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: '1.44',
        letterSpacing: 'normal',
        color: '#ffffff'
    }
}));
export const TrackMainText = () => {
    const classes = useStyles()

    const [mainText] = useState(
        'The CryptoFund aspires to create visibility for the donor and the public, adding a layer of transparent accounting to the donations ecosystem by deploying cryptocurrency. Below is a simple tool that provides a snapshot of all transfers, from donor to startups.'
    )
    return(
        <div className={classes.mainText}>
            { mainText }
        </div>
    )
}