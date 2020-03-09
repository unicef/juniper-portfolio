import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme: any) => ({
    mainText: {
        // width: '723px',
        // height: '414px',
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
export const MainText = () => {
    const classes = useStyles()

    const [mainText] = useState(
        'In October 2019, UNICEF announced it would be the first UN entity to make investments denominated in cryptocurrency, following the same principles as the existing UNICEF Innovation Fund. Using cryptocurrency in investments allows donors, UNICEF and investees to transparently and nearly instantaneously track where funds are, bringing a new level of funding visibility to the international development sector.'
    )
    return(
        <div className={classes.mainText}>
            { mainText }
        </div>
    )
}