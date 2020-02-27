import React from 'react'
import { Grid } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles'
import { ReceiveObject } from './ReceiveObject'
import { ReceiveText } from './ReceiveText'
import { ArrowButton } from '../Atoms/ArrowButton'
import { HorizontalBar } from '../Atoms/HorizontalBar'

const useStyles = makeStyles({
    root: {
      flexGrow:1,
      paddingTop: '64px',
      height:'183px'
    },
  });

export const Receive = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
          <Grid container>
            <Grid item xs={5}>
              <ReceiveText/>
            </Grid>
            <Grid item xs ={6}>
              <ReceiveObject/>
            </Grid>
            <Grid item xs={1}>
              <ArrowButton />
            </Grid>
            <Grid item xs = {12}>
              <HorizontalBar />
            </Grid>
          </Grid>
        </div>
    )
}