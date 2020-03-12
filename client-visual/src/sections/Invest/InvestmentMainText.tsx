import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme: any) => ({
    mainText: {
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
export const InvestmentMainText = () => {
    const classes = useStyles()

    const [mainText] = useState(
        'For our first pilot of the CryptoFund, three blockchain startups currently in our UNICEF Innovation Fund portfolio received funding from UNICEF in the form of cryptocurrency. The three companies receiving these initial donations are Prescrypto, Atix Labs and Utopixar which work in the areas of prescription tracking; impact investing; and community tokens and engagement.'
    )
    return(
        <div className={classes.mainText}>
            { mainText }
        </div>
    )
}