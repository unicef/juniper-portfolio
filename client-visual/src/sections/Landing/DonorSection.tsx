import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

interface Props {
    title: string
}

const useStyles = makeStyles((theme: any) => ({
    donorDot: {
        height: '482px',
        width: '482px',
        backgroundColor: '#0068ea',
        borderRadius: '50%',
        display: 'inline-block'
    }
}));

export const DonorSection = () => {
    const classes = useStyles();
    return (
        <span className={classes.donorDot}></span>
    )
}