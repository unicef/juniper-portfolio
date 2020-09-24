import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import SidebarHeader from "./SidebarHeader";
import SidebarNavigation from "./SidebarNavigation";

const drawerWidth = 245;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    border: "none",
  },
}));

export default function Sidebar(props) {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <SidebarHeader />
      <SidebarNavigation
        pageIndex={props.pageIndex}
        setPageIndex={props.setPageIndex}
        ethRate={props.ethRate}
        btcRate={props.btcRate}
      />
    </Drawer>
  );
}
