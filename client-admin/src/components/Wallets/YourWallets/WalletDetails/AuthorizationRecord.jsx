import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import { AuthorizationCard } from "../../WalletCards";

const useStyles = makeStyles((theme) => ({
  modal: {
    height: "100vh",
    margin: 0,
    maxHeight: "100vh",
    borderRadius: 0,
    maxWidth: 642,
  },
}));

export default function AuthorizationRecord({
  authorizationRecord,
  setAuthorizationRecord,
}) {
  const classes = useStyles();
  const [authorizationDetails, setAuthorizationDetails] = useState(
    authorizationDetailsData
  );

  useEffect(() => {
    setAuthorizationDetails(authorizationDetailsData);
  });

  return (
    <React.Fragment>
      <Dialog
        fullWidth
        open={!!authorizationRecord}
        onClose={() => {
          setAuthorizationRecord(null);
        }}
        classes={{ paper: classes.modal }}
      >
        <AuthorizationCard {...authorizationDetails} />
      </Dialog>
    </React.Fragment>
  );
}

const authorizationDetailsData = {
  address: "0x1287631231238712398712837",
  amount: 25,
  symbol: "ETH",
  currency: "Ethereum",
  valueSent: "3300.12",
  currentValue: "8300.21",
};
