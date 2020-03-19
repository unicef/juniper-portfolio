import React from 'react'
import { makeStyles } from '@material-ui/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme: any) => ({
    desktop: {
        paddingTop: '59px',
    },
    mobile: {
        paddingTop: '59px',
        width: '70%',
    },
}));

export const TrackMainImage = () => {
    const classes = useStyles()
    const mobiledevice = useMediaQuery('(max-width: 800px)');

    return(
        <img className={mobiledevice ? classes.mobile :  classes.desktop} src='./Infographic_track_mobile.png' alt='receive info' />
    )
}