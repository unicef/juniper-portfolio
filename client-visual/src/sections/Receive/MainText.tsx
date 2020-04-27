import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { useMediaQuery } from '@material-ui/core' 

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
export const MainText = () => {
    const classes = useStyles()
    const mobileDevice = useMediaQuery('(max-width: 800px)');
    const [mainText] = useState(
        'In October 2019, UNICEF announced it would be the first UN entity to make investments denominated in cryptocurrency, following the same principles as the existing UNICEF Innovation Fund. Using cryptocurrency in investments allows donors, UNICEF and investees to transparently and nearly instantaneously track where funds are, bringing a new level of funding visibility to the international development sector.'
    )
    return(
        <div className={mobileDevice ? classes.mobile : classes.mainText}>
            { mainText }
        </div>
    )
}