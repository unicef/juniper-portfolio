import React, { useEffect, useState } from "react";
import { withStyles, useTheme } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const styles = (theme) => ({
  root: {
    width: "100%",
    marginBottom: "2px",
  },
  heading: {
    fontFamily: '"Cabin", sans-serif',
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: 1,
    textAlign: "center",
    color: theme.palette.primary.main,
    boxShadow: "none",
    textTransform: "uppercase",
    paddingLeft: 15,
  },
  expansionDetails: {
    paddingTop: 0,
  },
  title: {
    fontFamily: '"Cabin", sans-serif',
    fontSize: 14,
    fontWeight: 700,
    lineHeight: 2,
    letterSpacing: 1,
    color: "#898989",
    textTransform: "uppercase",
    marginTop: 50,
    marginBottom: 15,
  },
});

function ExpansionList(props) {
  const [expanded, setExpanded] = useState(false);
  const { classes } = props;
  const theme = useTheme();
  useEffect(() => {
    setExpanded(props.expanded || false);
  }, []);

  return (
    <div className={classes.root}>
      {props.title && <h5 className={classes.title}>{props.title}</h5>}
      <ExpansionPanel
        elevation={0}
        expanded={expanded}
        onChange={() => {
          setExpanded(!expanded);
        }}
      >
        <ExpansionPanelSummary
          expandIcon={
            <ExpandMoreIcon style={{ color: theme.palette.primary.main }} />
          }
        >
          <Typography className={classes.heading}>{props.heading}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.expansionDetails}>
          {props.children}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

export default withStyles(styles)(ExpansionList);
