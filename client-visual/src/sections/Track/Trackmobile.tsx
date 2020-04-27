import React from 'react'
import { TrackMainText } from './TrackMainText'
import { TrackMainImage } from './TrackMainImage'
import { TrackMobileSummary } from './TrackMobileSummary'
import { TXSelect } from './DonationTable/TXSelect'
import { makeStyles } from '@material-ui/core'
import { Grid } from '@material-ui/core'
// import { Transaction } from './DonationTable/Transaction'

const useStyles = makeStyles((theme: any) => ({
    top: {
        backgroundColor:'#0068ea',
        padding: '50px 25px',
        paddingBottom: '70px',
    },
    ctracker: {
        paddingBottom: '10px',
    },
}))

export const TrackMobile = () => {
    const classes = useStyles()

    return (
        <div>
            <div className={classes.top}>
                <Grid container>
                    <Grid item xs={12} sm={9}>
                        <TrackMainText />
                    </Grid>
                </Grid>

                
                <Grid container alignContent='center' alignItems='center' justify='center' >
                    <TrackMainImage />
                </Grid>
            </div>
            <div>
                <TrackMobileSummary />
            </div>
            <div>
                <TXSelect />
            </div>
        </div>
    )
}