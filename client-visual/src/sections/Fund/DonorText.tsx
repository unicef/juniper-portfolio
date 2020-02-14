import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';

interface Props {
    title: string
}

const useStyles = makeStyles((theme: any) => ({
    text: {
        width: '723px',
        height: '414px',
        fontFamily: 'Cabin',
        fontSize: '32px',
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: '1.44',
        letterSpacing: 'normal',
        color: '#000000',
        position:'absolute',
        marginTop:'216px',
        paddingLeft:'53px'
    }
}));

export const DonorText = () => {
    const classes = useStyles();
    const [donorText] = useState(
        'In October 2019, UNICEF announced it would be the first UN entity to make investments denominated in cryptocurrency, following the same principles as the existing UNICEF Innovation Fund. Using cryptocurrency in investments allows donors, UNICEF and investees to transparently and nearly instantaneously track where funds are, bringing a new level of funding visibility to the international development sector.'
    )
    return (
        <div style={{display:'inline-block'}} className={classes.text}>{donorText}</div>
    )
}