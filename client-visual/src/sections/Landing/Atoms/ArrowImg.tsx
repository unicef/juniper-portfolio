import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    root: {
        paddingTop: '35px', 
        paddingLeft: '30px',
    },
  });

export const ArrowImg = () => {

    const classes = useStyles()

    return (
        <div className = {classes.root}>
            <img src="Arrow_white.svg" />
        </div>
    )
}