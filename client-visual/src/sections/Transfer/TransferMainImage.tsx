import React from 'react'
import { makeStyles } from '@material-ui/styles'
const useStyles = makeStyles((theme: any) => ({
    root: {
        paddingTop:'59px',
        paddingleft:'358px'
    }
}));

export const TransferMainImage = () => {
    const classes = useStyles()
    
    return(
        <img className={classes.root} src='./Infographic:track:mobile.png' alt='receive info' />
    )
}