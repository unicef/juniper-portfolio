import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid } from '@material-ui/core'

const useStyles = makeStyles((theme: any) => ({
    root: {
        // paddingTop:'100px'
        padding: '14px', 
    },
    imgFormat: {
        width: '87%',
        margin: 'auto',
        paddingLeft: '150px',
        //objectFit: "contain",
        
    }
}))

export const FundingProcessImage = (props: any) => {
    const classes = useStyles()
    return(
        <Grid item xs={12} sm={12} md={12}>
            <div className={classes.root}>
                { 
                props.flag ?
                    <img className={classes.imgFormat} src='./sample-transaction.png' alt='sample transaction' />
                : 
                    <img className={classes.imgFormat} src='./Funding flow illustration.png' alt='sample transaction' />
                }
            </div>
        </Grid>
    )
}