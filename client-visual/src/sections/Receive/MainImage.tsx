import React from 'react'
import { makeStyles } from '@material-ui/styles'
const useStyles = makeStyles((theme: any) => ({
    root: {
        paddingTop: '59px',
        width: '20%',
        paddingLeft: '40px',
        marginBottom: '-5px',
    }
}));

export const MainImage = () => {
    const classes = useStyles()
    
    return(
        <img className={classes.root} src='./Receive_illustration.svg' alt='receive info' />
    )
}