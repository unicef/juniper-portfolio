import React from 'react'
import { TrackMainText } from './TrackMainText'
import { TrackMainImage } from './TrackMainImage'
import { CryptoTracker } from './CryptoTracker'
import { DonationTable } from './DonationTable'
import { makeStyles } from '@material-ui/core'
import { Grid } from '@material-ui/core'
import { SideDetails } from '../../common/SideDetails'

const useStyles = makeStyles((theme: any) => ({
    top: {
        backgroundColor:'#0068ea',
        paddingTop: '100px',
    },

    ctracker: {
        paddingBottom: '10px',
    },
}))

export const Trackdesktop = () => {
    const classes = useStyles()

    return (
        <div>
            <div className={classes.top} style={{ paddingLeft: '14px', paddingRight: '14px', paddingBottom: '14px' }}>
                <Grid container>
                    <Grid item xs={12} sm={3}>
                    <SideDetails />

                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <TrackMainText />
                    </Grid>
                </Grid>

                
                <Grid container alignContent='center' alignItems='center' justify='center' >
                    <TrackMainImage />
                </Grid>
                <Grid container className={classes.ctracker} alignContent='center' alignItems='center' justify='center'>
                    <CryptoTracker />
                </Grid>
            </div>
            <div>
                <DonationTable/>
            </div>
        </div>
    )
}