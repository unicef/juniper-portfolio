import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';

interface Props {
    title: string
}

const useStyles = makeStyles((theme: any) => ({
   header: {
        fontFamily: 'Cabin',
        fontSize: '28px',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: '1.64',
        letterSpacing: 'normal',
        color: '#000000',

   } ,
    details: {
        fontFamily: 'IBM Plex Sans',
        fontSize: '22px',
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: '1.55',
        letterSpacing: 'normal',
        color: '#000000'
    },
    detailsBolded: {
        fontFamily: 'IBM Plex Sans',
        fontSize: '22px',
        fontWeight: 'bold',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: '1.55',
        letterSpacing: 'normal',
        color: '#0068ea',
    },
    spacing: {
        width: '723px',
        height: '238px',
        paddingTop:'140px',
        paddingLeft:'358px'
    }
}));

export const BackgroundText = () => {
    const classes = useStyles();
    const [backgroundHeader] = useState('Background')
    const [backgroundText] = useState(
        'Launched in 2014, the UNICEF '
    )
    const [backgroundTextBolded] = useState(
        'Innovation Fund'
    )
    const [secondHalfBackgroundText] = useState(
        ' allows UNICEF to quickly assess, fund and grow open-source solutions that can improve children’s lives. Financial and technological support is available for companies that are using technology in innovative ways to improve the world. The Fund has made 85  investments in 55 countries with an eye to invest in 20 more start-ups each year. Until 2019, all investments were made in USD.'
    )
    return (
        <div className={classes.spacing}>
            <span className={classes.header}>{backgroundHeader}</span><br/>
            <span className={classes.details}>{backgroundText}</span><span className={classes.detailsBolded}>{backgroundTextBolded}</span><span className={classes.details}>{secondHalfBackgroundText}</span>
        </div>
    )
}