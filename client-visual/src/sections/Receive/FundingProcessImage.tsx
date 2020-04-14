import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid, useMediaQuery } from '@material-ui/core'
import json2mq from 'json2mq'

const useStyles = makeStyles((theme: any) => ({
    root: {
        padding: '14px', 
    },
    imgFormat: {
        margin: 'auto',
        width:'87%'
    },
    imgFormat2: {
        margin: 'auto',
        width:'100%'
    }
}))

export const FundingProcessImage = (props: any) => {
    const classes = useStyles()
    const matches = useMediaQuery(
        json2mq({
            minWidth: 700
        })
    )
    return (
        <Grid item xs={12} sm={12} md={12}>
            <div style={{paddingLeft: matches ? '150px' : '0px' }} className={classes.root}>
                { 
                props.flag ?
                    <img className={matches ? classes.imgFormat : classes.imgFormat2} src='./sample-transaction.png' alt='sample transaction' />
                : 
                    <img className={matches ? classes.imgFormat : classes.imgFormat2} src='./Funding flow illustration.png' alt='sample transaction' />
                }
            </div>
        </Grid>
    )
}