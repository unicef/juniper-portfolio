import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "../../molecules/Drawer";
import PageLayout from "../../templates/Page";
import HelpTemplate from "../../templates/Help";
import CancelIcon from "../../atoms/Icons/CancelIcons";

const accountHelp = require("./accountHelp");
const walletHelp = require("./walletHelp");
const transactionHelp = require("./transactionHelp");

const useStyles = makeStyles({
  close: {
    position: "absolute",
    left: 8,
    top: 8,
    cursor: "pointer",
    zIndex: 99999,
  },
});

export default function HelpDrawer({ open, anchor, onClose, children }) {
  const classes = useStyles();
  const [tabs] = useState(["Wallets", "Accounts", "Transactions"]);

  return (
    <Drawer open={open} anchor={anchor || "right"} onClose={onClose}>
      <CancelIcon className={classes.close} onClick={onClose} />
      <PageLayout tabs={tabs} style={{ marginTop: 0, width: 504 }}>
        <div>
          {walletHelp.map((help) => {
            return (
              <HelpTemplate
                title={help.title}
                content={help.content}
                image={help.image}
              />
            );
          })}
        </div>

        <div>
          {accountHelp.map((help) => {
            return (
              <HelpTemplate
                title={help.title}
                content={help.content}
                image={help.image}
              />
            );
          })}
        </div>
        <div>
          {transactionHelp.map((help) => {
            return (
              <HelpTemplate
                title={help.title}
                content={help.content}
                image={help.image}
              />
            );
          })}
        </div>
      </PageLayout>
    </Drawer>
  );
}
