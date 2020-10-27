import React from "react";
import Drawer from "@material-ui/core/Drawer";

export default function HelpDrawer({ open, anchor, onClose, children }) {
  return (
    <div>
      <Drawer anchor={anchor} open={open} onClose={onClose}>
        {children}
      </Drawer>
    </div>
  );
}
