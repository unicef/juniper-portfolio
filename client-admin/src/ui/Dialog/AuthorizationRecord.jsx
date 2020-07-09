import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import { AuthorizationCard, AuthorizationSignerCard } from "../Cards";

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
    //Todo hit API with authorizationRecord (Probs be txid)
    setAuthorizationDetails(authorizationDetailsData);
  }, []);

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
        <AuthorizationCard
          address={authorizationDetails.address}
          amount={authorizationDetails.amount}
          symbol={authorizationDetails.symbol}
          currency={authorizationDetails.currency}
          valueSent={authorizationDetails.valueSent}
          currentValue={authorizationDetails.currentValue}
        />
        {authorizationDetails.signers.map((signer, index) => {
          return (
            <AuthorizationSignerCard key={index} {...signer} index={index} />
          );
        })}
      </Dialog>
    </React.Fragment>
  );
}

const authorizationDetailsData = {
  address: "0x89205A3A3b26Dty66hxIief5hjdd8e0wk0KK58fj",
  amount: 25,
  symbol: "ETH",
  currency: "Ethereum",
  valueSent: "3300.12",
  currentValue: "8300.21",
  signers: [
    {
      address: "0xxIief5hjdd8e0wk0KK58fj89205A3A3b26Dty66h",
      owner: "Christopher Waltz",
      timestamp: "Mar 24 2020 at 11:04",
    },
    {
      address: "0x0KK58fj89205A3A3b26Dty66xIief5hjdd8e0wkh",
      owner: "Khalija Ali",
      timestamp: "Mar 24 2020 at 11:51",
    },
    /*
    {
      address: "0x0KK58fj89205A3A3b26Dty66xIief5hjdd8e0wkh",
      owner: "ScrollY Check",
      timestamp: "Mar 24 2020 at 11:51",
    },
    */
  ],
};
