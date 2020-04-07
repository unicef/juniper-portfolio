import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'

const useStyles = makeStyles({
  imgSpecs: {
    width: '255px',
    paddingTop: '10px',
  }
});

export const ReceiveImage = () => {
    const classes = useStyles()
    return (
      <img  className={classes.imgSpecs} src='./Receive_illustration.svg' alt='ratio of crypto pie chart' />

    )
}