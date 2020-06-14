import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import CopyIcon from "./CopyIcon";

const useStyles = makeStyles({
  
    leftButton:
    {
        fontSize: 12,
        fontWeight: 700,
        fontFamily: '"Cabin", sans-serif',
        color: "#00aeef",
        "&:hover": {
          backgroundColor: "#ecfaff",
        },
      },
  
});

export default function CopyToClipboardBtn(props) {
  const classes = useStyles();
  
  const copyToClipboard = () => {
    const el = document.createElement("textarea");
    el.innerText = props.data;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    el.remove();
  };
    

    return (
      <Button className={classes.leftButton} startIcon={<CopyIcon fontSize="large" />} onClick={copyToClipboard()}>
        Copy
    </Button>
    )

}