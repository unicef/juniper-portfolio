import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: any) => ({
    subText: {
        width: '723px',
        height: '105px',
        fontFamily: 'Cabin',
        fontSize: '26px',
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: '1.35',
        letterSpacing: 'normal',
        color: '#000000'
    }
}));

export const SubText = () => {
    const classes = useStyles()
    const [subText] = useState(
        "Building upon the existing UNICEF Innovation Fund, startups in UNICEF Innovation's portfolio will now be able to receive the funding in a quick and transparent way via cryptocurrency."
    )
    return (
        <span className={classes.subText}>{subText}</span>
    )
}