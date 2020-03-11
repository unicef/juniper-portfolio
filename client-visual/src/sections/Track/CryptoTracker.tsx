import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { ArrowDownButton } from './ArrowDownButton';

const useStyles = makeStyles((theme: any) => ({
    mainText: {
        width: '723px',
        // height: '414px',
        fontFamily: 'Cabin',
        fontSize: '14px',
        fontWeight: 'bold',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 'normal',
        letterSpacing: '1.17px',
        color: '#ffffff',
        textTransform:'uppercase'
    }
}));
export const CryptoTracker = () => {
    const classes = useStyles()

    const [cryptoTrackerText] = useState(
        'Crypto Tracker'
    )
    return(
        <div className={classes.mainText}>
            { cryptoTrackerText }<br/>
            <span style={{alignContent:'center'}}><ArrowDownButton /></span>
        </div>
    )
}