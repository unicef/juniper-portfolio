import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    juniper: {
        width: 110,
        height: 44,
        fontSize: 36,
        fontWeight: 'bold',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        color: '#00aeef',
    },
    container: {
        paddingLeft: 26,
        paddingTop: 14,
        height: 115
    }
}));

export default function SidebarHeader() {
    const classes = useStyles();

    return (
        <Grid container>
            <Grid item xs={12} className={classes.container}>
                <Typography variant="h1" component="h1" className={classes.juniper}>
                    Juniper
                </Typography>

            </Grid>
        </Grid>
    );
}
