import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

const useStyles = makeStyles({
    imgSpecs: {
        width: '236px',
    paddingTop: '20px',    
    }
  });

export const TrackImage = () => {
    const classes = useStyles()
    return (
              <img  className={classes.imgSpecs} src='./Track_illustration.svg' alt='ratio of crypto pie chart' />
    )
}