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
        display: 'inline-block',
        position: 'absolute'
    },
    
}));

export const DonorSection = () => {
    const classes = useStyles();
    return (
        <div>
            <span style={{display:'inline-block'}} className={classes.donorDot}></span>
        </div>
    )
}