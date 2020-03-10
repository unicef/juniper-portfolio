import React from 'react'
import { makeStyles } from '@material-ui/styles'
const useStyles = makeStyles((theme: any) => ({
    root: {
        paddingTop: '0px',
        marginTop: '-120px',
        paddingLeft: '380px',
        height: '150px'
    }
}));

export const TrackingMainImage = () => {
    const classes = useStyles()
    
    return(
        <img className={classes.root} src='./Infographic_track.png' alt='receive info' />
    )
}