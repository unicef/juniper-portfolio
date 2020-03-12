import React from 'react';
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
    root: {
        width: '60%', 
        padding: '25px 35px'
    },
  });


export const ProgressBar = (props:any) => {
    const classes = useStyles()

    if (props.type == 'Invested')
    {
        return (
            <img className={classes.root} src='./progressbar_3.svg' alt='receive info' />
        )
    }
    else
    {
        return (
            <img className={classes.root} src='./progressbar_2.svg' alt='receive info' />
        )
    } 
}