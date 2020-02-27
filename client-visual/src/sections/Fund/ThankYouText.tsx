import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme: any) => ({
    root: {
        paddingTop:'25px'
    },
    thankYouText: {
        width:'728px',
        fontFamily:'IBM Plex Sans',
        fontSize:'16px',
        fontWeight:'normal',
        fontStretch:'normal',
        fontStyle:'normal',
        lineHeight:'1.56',
        letterSpacing:'normal',
        color:'#000'
    },
    imgFormat: {
        marginTop:'10px',
        width: '157px',
        height: '65px'
    }
}));

export const ThankYouText = () => {
    const classes = useStyles()

    const [thankYouText] = useState(
        'We would like to thank our donors supporting the CryptoFund.'
    )
    return(
        <div className={classes.root}>
            <div className={classes.thankYouText}>{thankYouText}</div>
            <img className={classes.imgFormat} src='https://user-images.githubusercontent.com/8097623/70676240-56ebcc80-1c40-11ea-9aa8-51b7f75af8ba.png' alt='ethereum foundation logo'/>
        </div>
    )
}