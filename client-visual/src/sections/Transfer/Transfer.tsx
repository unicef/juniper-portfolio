import React from 'react'
import { TransferMainText } from './TransferMainText'
import { TransferMainImage } from './TransferMainImage'
import { TransferCryptoTracker } from './TransferCryptoTracker'
import { DonationTable } from './DonationTable'
import { makeStyles } from '@material-ui/core'
import { Grid } from '@material-ui/core'
const useStyles = makeStyles((theme: any) => ({
    top: {
        backgroundColor:'#0068ea',
        paddingLeft: '57px',
        paddingTop:'100px'
    }
}))

export const Transfer = () => {
    const classes = useStyles()

    return (
        <div>
            <div className={classes.top}>
                <Grid container>
                    <Grid item xs={12} sm={2}>

                    </Grid>
                    <Grid item xs={12} sm={10}>
                        <TransferMainText />
                    </Grid>
                </Grid>
                <Grid container alignContent='center' alignItems='center' justify='center' >
                    <Grid item xs={12} sm={2}>

                    </Grid>
                    <Grid item xs={12} sm={10}>
                        <TransferMainImage />
                    </Grid>
                </Grid>
                <Grid container alignContent='center' alignItems='center' justify='center'>
                    <Grid item xs={12} sm={2}>

                    </Grid>
                    <Grid item xs={12} sm={10}> 
                        <TransferCryptoTracker />
                    </Grid>
                </Grid>
            </div>
            <div>
                <DonationTable/>
            </div>
        </div>
    )
}