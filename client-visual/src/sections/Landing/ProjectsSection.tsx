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
        display: 'inline-block',
        position: 'relative',
        marginLeft: '800px',
        zIndex:-5,
        marginTop:'-200px'
    }
}));

export const ProjectsSection = () => {
    const classes = useStyles();
    return (
        <span style={{display:'inline-block'}} className={classes.projectsDot}></span>
    )
}