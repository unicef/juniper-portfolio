import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Typography, Grid } from '@material-ui/core'

export const MobileOpenNavigation = () => {
    return(
        <Paper>
            <Grid container>
                <Grid item >
                    <Typography>
                        Receive
                    </Typography>
                </Grid>
                <Grid item >
                    <Typography>
                        Invest
                    </Typography>
                </Grid>
                <Grid item >
                    <Typography>
                        Track
                    </Typography>
                </Grid>
                <Grid item >
                    <Typography>
                        About
                    </Typography>
                </Grid>
                <Grid item>
                    Mail Icon
                    Twitter Icon
                </Grid>
            </Grid>
        </Paper>
    )
}