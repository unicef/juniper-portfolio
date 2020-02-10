import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

interface Props {
    title: string
}

const useStyles = makeStyles((theme: any) => ({
    projectsDot: {
        height: '797px',
        width: '797px',
        backgroundColor: '#ffd113',
        borderRadius: '50%',
        display: 'inline-block'
    }
}));

export const ProjectsSection = () => {
    const classes = useStyles();
    return (
        <span className={classes.projectsDot}></span>
    )
}