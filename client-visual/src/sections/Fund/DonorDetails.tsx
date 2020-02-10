import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

interface Props {
    title: string
}

const useStyles = makeStyles((theme: any) => ({
    donorDetailsDot: {
        height: '368px',
        width: '368px',
        backgroundColor: '#0068ea',
        borderRadius: '50%',
        display: 'inline-block'
    }
}));

export const DonorDetails = () => {
    const classes = useStyles();
    return (
        <span className={classes.donorDetailsDot}></span>
    )
}