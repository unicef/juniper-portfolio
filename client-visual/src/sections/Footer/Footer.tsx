import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { IconButton, Toolbar, CssBaseline, AppBar } from '@material-ui/core'
import {Twitter as TwitterIcon, Mail as MailIcon} from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      padding: theme.spacing(2, 2, 0),
    },
    paper: {
      paddingBottom: 50,
    },
    list: {
      marginBottom: theme.spacing(2),
    },
    subheader: {
      backgroundColor: theme.palette.background.paper,
    },
    appBar: {
      top: 'auto',
      bottom: 0,
    },
    grow: {
      flexGrow: 1,
    },
  }),
);

export default function Footer() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar  style={{marginTop:'500px'}} position="fixed" color="primary" className={classes.appBar}>
        <Toolbar variant="dense">
          <div className={classes.grow} />
          <IconButton color="inherit">
            <TwitterIcon />
          </IconButton>
          <IconButton edge="end" color="inherit">
            <MailIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}