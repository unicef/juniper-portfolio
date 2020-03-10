import React from 'react'
import { Grid } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles'
import { ReceiveObject } from './ReceiveObject'
import { ReceiveText } from './ReceiveText'
import { ReceiveImage } from './ReceiveImage'
import { ArrowButton } from '../Atoms/ArrowButton'
import { HorizontalBar } from '../Atoms/HorizontalBar'

const useStyles = makeStyles({
    root: {
      // flexGrow:1,
      paddingTop: '64px',
      height:'183px'
    },
  });

export const Receive = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
          <Grid container>
              <ReceiveText/> {/** has 3 col and 1 col */}
              <Grid item xs={'auto'} sm={'auto'}></Grid>
              <ReceiveObject/>  {/** has col 2 and 2 */}
              <ReceiveImage/>
              {/* <ArrowButton /> */}
            <Grid item xs = {12} sm = {12}>
              <HorizontalBar />
            </Grid>
          </Grid>
        </div>
    )
}