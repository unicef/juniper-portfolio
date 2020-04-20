import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    root: {
        paddingTop: '55px', 
    },

  });

export const ArrowImg = () => {

    const classes = useStyles()

    return (
        <div className = {classes.root}>
            <img src="Arrow_white.svg" alt='arrow' />
        </div>
    )
}