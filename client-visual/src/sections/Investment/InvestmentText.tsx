import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: any) => ({
    mainText: {
        width: '723px',
        // height: '132px',
        fontFamily: 'Cabin',
        fontSize: '32px',
        fontWeight: 'normal',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: '1.44',
        letterSpacing: 'normal',
        color: '#000000',
        paddingLeft: '358px',
        position:'absolute',
        display: 'inline-block',
        marginTop:'177px'
    }
}));

export const InvestmentText = () => {
    const classes = useStyles();
    const [investmentText] = useState('For our first pilot of the CryptoFund, three blockchain startups currently in our UNICEF Innovation Fund portfolio received funding from UNICEF in the form of cryptocurrency. The three companies receiving these initial donations are Prescrypto, Atix Labs and Utopixar which work in the areas of prescription tracking; impact investing; and community tokens and engagement.')
    
    return(
        <div className={classes.mainText}>
            {investmentText}
        </div>
    )
}