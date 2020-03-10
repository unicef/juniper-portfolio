import React from 'react'
import { makeStyles } from '@material-ui/styles'
const useStyles = makeStyles((theme: any) => ({
    root: {
        paddingTop:'59px'
    }
}));

export const MainImage = () => {
    const classes = useStyles()
    
    return(
        <img className={classes.root} src='./Infographic_receive_mobile.png' alt='receive info' />
    )
}