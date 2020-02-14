import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';

interface Props {
    title: string
}

const useStyles = makeStyles((theme: any) => ({
    thankYouText: {
        
        fontFamily: 'IBM Plex Sans',
        fontSize: '16px',
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: '1.56',
        letterSpacing: 'normal',
        color: '#000000'
    },
    logoPlacement: {
        width: '157px',
        height: '65px'
    },
    spacing: {
        paddingTop:'75px',
        paddingLeft:'358px',
        width: '449px',
        height: '100px',
    }
}));

export const ThankYouDonors = () => {
    const classes = useStyles();
    const [thankYouText] = useState(
        'We would like to thank our donors supporting the CryptoFund.'
    )
    const [efLogo] = useState(
        'https://user-images.githubusercontent.com/8097623/70676240-56ebcc80-1c40-11ea-9aa8-51b7f75af8ba.png'
    )
    return (
        <div className={classes.spacing}>
            <span className={classes.thankYouText}>{thankYouText}</span><br/>
            <img className={classes.logoPlacement} src={efLogo}/>
        </div>
    )
}