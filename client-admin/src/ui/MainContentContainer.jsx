import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: 155,
        paddingTop: 40
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