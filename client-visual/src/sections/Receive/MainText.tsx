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
        'To understand and be ready for a digitally financed future, UNICEF with the support of donors is the first UN organization to receive and hold crypto-denominated assets through its CryptoFund. By contributing either bitcoin or ether to the CryptoFund, donors support the growth of open-source technology projects. Currently, UNICEF France, New Zealand, Australia and USA accept cryptocurrency donations. UNICEF’s work will benefit from tapping into these new funding streams and have far-reaching impact for the entire organization and most importantly children.'
    )
    return(
        <div className={mobileDevice ? classes.mobile : classes.mainText}>
            { mainText }
        </div>
    )
}