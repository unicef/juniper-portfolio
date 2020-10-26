import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    fontFamily: '"Roboto", sans-serif',
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
  },
  content: {
    fontSize: 16,
    lineHeight: 1.5,
  },
  image: {},
});

export default function HelpTemplate({ title, content, image }) {
  const classes = useStyles();
  const [tabs] = useState(["Wallets", "Accounts", "Transactions"]);
  return (
    <div className={classes.root}>
      <h2 className={classes.title}>{title}</h2>
      <p className={classes.content}>{content}</p>
      <img className={classes.image} src={image} />
    </div>
  );
}
