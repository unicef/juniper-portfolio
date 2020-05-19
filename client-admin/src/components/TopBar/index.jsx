import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: 'none'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (    
    <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
            <Typography variant="h6" className={classes.title}>
                Image placeholder
            </Typography>
            <Typography variant="h6" style={{color: "#ffffff"}}>
                First Last
            </Typography>
            <ExpandMoreIcon style={{color: "#ffffff", marginRight: 40}}/>
        </Toolbar>
    </AppBar>
  );
}
