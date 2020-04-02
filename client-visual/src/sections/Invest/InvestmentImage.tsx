import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid } from '@material-ui/core'

const useStyles = makeStyles((theme: any) => ({
    root: {
        maxWidth: '100%',

    }
}))

export const InvestmentImage = (props: any) => {
    const classes = useStyles()
    return(
        <div>
            <Grid container>
                <Grid item xs={12} sm={12} md={3}></Grid>
                <Grid item xs={12} sm={12} md={9}>
                    <img className={classes.root} src={props.linkToImage} alt={props.altDescription}/>
                </Grid>
            </Grid>
        </div>
    )
}