import React from 'react'
import { TrackMainText } from './TrackMainText'
import { TrackMainImage } from './TrackMainImage'
import { CryptoTracker } from './CryptoTracker'
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

export const Track = () => {
    const classes = useStyles()

    return (
        <div>
            <div className={classes.top}>
                <Grid container>
                    <Grid item xs={12} sm={2}>

                    </Grid>
                    <Grid item xs={12} sm={10}>
                        <TrackMainText />
                    </Grid>
                </Grid>
                <Grid container alignContent='center' alignItems='center' justify='center' >
                    <Grid item xs={12} sm={2}>

                    </Grid>
                    <Grid item xs={12} sm={10}>
                        <TrackMainImage />
                    </Grid>
                </Grid>
                <Grid container alignContent='center' alignItems='center' justify='center'>
                    <Grid item xs={12} sm={2}>

                    </Grid>
                    <Grid item xs={12} sm={10}> 
                        <CryptoTracker />
                    </Grid>
                </Grid>
            </div>
            <div>
                <DonationTable/>
            </div>
        </div>
    )
}