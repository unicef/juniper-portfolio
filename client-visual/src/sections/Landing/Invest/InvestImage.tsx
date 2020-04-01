import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

const useStyles = makeStyles({
  imgSpecs: {
    maxWidth:'255px'
  }
});


export const InvestImage = () => {
  const classes = useStyles()  
  return (
    <Grid item xs={6} sm={6} md={3}>
        <img className={classes.imgSpecs} src='./Invest_illustration.svg' alt='ratio of crypto pie chart' />
    </Grid>
    )
}