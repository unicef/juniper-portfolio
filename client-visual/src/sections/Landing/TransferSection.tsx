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
        <h3>ARROW</h3>
    )
}