import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';

interface Props {
    title: string
}

const useStyles = makeStyles((theme: any) => ({
}));

export const TransferSection = () => {
    const classes = useStyles();
    return (
        <img style={{zIndex:-1, paddingLeft:'351px', display:'inline-block', width:'704px', position:'absolute'}} src={'./big-arrow.png'} />
    )
}