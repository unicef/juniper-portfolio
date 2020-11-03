import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "../../molecules/Drawer";
import PageLayout from "../../templates/Page";
import HelpTemplate from "../../templates/Help";
import CancelIcon from "../../atoms/Icons/CancelIcons";

const helpData = require("./helpData");

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
          {helpData
            .filter((help) => {
              return help.section === "Wallets";
            })
            .map((help) => {
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
          {helpData
            .filter((help) => {
              return help.section === "Accounts";
            })
            .map((help) => {
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
          {helpData
            .filter((help) => {
              return help.section === "Transactions";
            })
            .map((help) => {
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
