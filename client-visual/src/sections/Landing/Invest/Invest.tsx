import React from 'react'
import { Grid } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles'
import { InvestObject } from './InvestObject'
import { InvestImage } from './InvestImage'
import { InvestText } from './InvestText'
import { ArrowButton } from '../Atoms/ArrowButton'
import { HorizontalBar } from '../Atoms/HorizontalBar'

const useStyles = makeStyles({
    root: {
      flexGrow:1,
      height:'183px'
    },
  });

export const Invest = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
          <Grid container>
              <InvestText/>
              <Grid item xs={'auto'} sm={'auto'}></Grid>
              <InvestObject/>
              <InvestImage/>
              {/* <ArrowButton /> */}
            <Grid item xs = {12}>
              <HorizontalBar />
            </Grid>
          </Grid>
        </div>
    )
}