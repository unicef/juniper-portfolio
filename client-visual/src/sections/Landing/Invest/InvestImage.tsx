import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

const useStyles = makeStyles({
  imgSpecs: {
    maxWidth:'100%'
  }
});


export const InvestImage = () => {
  const classes = useStyles()  
  return (
    <Grid item xs={6} sm={6} md={3}>
        <img className={classes.imgSpecs} src='./Infographic:invest:mobile.png' alt='ratio of crypto pie chart' />
    </Grid>
    )
}