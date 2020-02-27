import React from 'react'
import { Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    root: {
      flexGrow:1,
    },
  });

export const HorizontalBar = () => {
    const classes = useStyles()
    return (
        <Divider className={classes.root} light={true} />
    )
}