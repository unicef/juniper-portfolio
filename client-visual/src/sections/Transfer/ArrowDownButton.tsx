import React from 'react'
import { IconButton } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    iconButton: {
        width:'18px', 
        height:'34px', 
        color:'white', 
        // paddingBottom:'75px', 
    },
  });


export const ArrowDownButton = () => {
    const classes = useStyles()

    return (
        <IconButton className={classes.iconButton}>
            <ExpandMoreIcon/>
        </IconButton>
    )
}