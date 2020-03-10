import React from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import { SideDetails} from '../../common/SideDetails'
import { TrackingMainText } from './TrackingMainText'
import { TrackingMainImage} from './TrackingMainImage'


const useStyles = makeStyles((theme: any) => ({
    top: {
        backgroundColor:'#0068ea',
        paddingLeft:'57px',
        paddingTop:'100px'
    },
}));

export const Tracking = () => {
    const classes = useStyles();

    return(
        <div>
            <div className={classes.top}>
                <Grid container>
                    <Grid item xs={12} sm={2}>
                        <SideDetails />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TrackingMainText />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12}>
                      <TrackingMainImage />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}