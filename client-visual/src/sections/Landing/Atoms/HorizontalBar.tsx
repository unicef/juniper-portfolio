import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        border: '2px solid #0050b4',
        
    },
  });

export const HorizontalBar = () => {
    const classes = useStyles()
    return (
        <hr className={classes.root} />
    )
}