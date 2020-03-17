import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { ArrowDownButton } from './ArrowDownButton';

const useStyles = makeStyles((theme: any) => ({
    mainText: {
        fontFamily: 'Cabin',
        fontSize: '14px',
        fontWeight: 'bold',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 'normal',
        letterSpacing: '1.17px',
        color: '#ffffff',
        textTransform: 'uppercase',
        //marginLeft: 'auto',
        //marginRight: 'auto',
        margin: 'auto',
        paddingTop: '40px',
        paddingBottom: '20px',
    }
}));
export const CryptoTracker = () => {
    const classes = useStyles()

    const [cryptoTrackerText] = useState(
        'Crypto Tracker'
    )
    return(
        <div className={classes.mainText}>
            {cryptoTrackerText}<br />
            <ArrowDownButton />
            {/*<span style={{alignContent:'center'}}><ArrowDownButton /></span>*/}
        </div>
    )
}