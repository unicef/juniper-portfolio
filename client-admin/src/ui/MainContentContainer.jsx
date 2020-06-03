import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: "46px 50px 70px 155px",
        backgroundColor: '#f8f8f8',
    }
}));

export default function ({ children }) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {children}
        </div>
    )
}