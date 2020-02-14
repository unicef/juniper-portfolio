import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: any) => ({
    mainText: {
        width: '723px',
        height: '132px',
        fontFamily: 'Cabin',
        fontSize: '36px',
        fontWeight: 'bold',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        color: '#000000',
        paddingLeft: '358px'
    }
}));

export const MainText = () => {
    const classes = useStyles();
    const [mainText] = useState(
        "UNICEF'S CryptoFund is a new financial vehicle allowing UNICEF to receive, hold, and disburse cryptocurrency—a first for the UN"
    )
    return (
        <div className={classes.mainText}>{mainText}</div>
    )
}