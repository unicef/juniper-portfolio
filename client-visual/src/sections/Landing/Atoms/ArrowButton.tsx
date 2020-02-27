import React from 'react'
import { IconButton } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    iconButton: {
        width:'18px', 
        height:'34px', 
        color:'white', 
        paddingBottom:'75px', 
    },
  });


export const ArrowButton = () => {
    const classes = useStyles()

    return (
        <IconButton className={classes.iconButton}>
            <ArrowForwardIosIcon/>
        </IconButton>
    )
}