import React from 'react'
import { IconButton } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    iconPic:
    {
        fontSize: '5em',
        marginBottom: '-17px',
        marginTop: '-10px',
    },
  });


export const ArrowDownButton = () => {
    const classes = useStyles()

    return (

        <div>
            <img src='downarrow.svg' alt=' ' className={classes.iconPic}/>
        </div>
    )
}