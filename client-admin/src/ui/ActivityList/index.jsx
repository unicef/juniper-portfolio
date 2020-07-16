import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import "./styles.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  listItem: {
    fontFamily: '"Roboto", sans-serif',
    fontSize: 16,
    lineHeight: 1.6,
    marginTop: 12,
    marginBottom: 12,
  },

  timestamp: {
    fontSize: 14,
    color: "#898989",
    lineHeight: 1.57,
    textAlign: "right",
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function ActivityList(props) {
  const classes = useStyles();

  return (
    <List component="nav" className={classes.root}>
      {props.data.map((action, index) => {
        return (
          <Fragment key={index}>
            <Divider />
            <ListItem className={classes.listItem}>
              <Grid container>
                <Grid
                  item
                  xs={10}
                  dangerouslySetInnerHTML={{ __html: action.text }}
                ></Grid>
                <Grid item xs={2} className={classes.timestamp}>
                  {action.timestamp}
                </Grid>
              </Grid>
            </ListItem>
          </Fragment>
        );
      })}
    </List>
  );
}
