import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import { AuthorizationCard, AuthorizationSignerCard } from "../../../ui/Cards";
import CancelIcon from "../../atoms/Icons/CancelIcons";

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
  exchangeRate,
}) {
  const classes = useStyles();
  const [signers, setSigners] = useState([]);

  const getAuthRecords = async () => {
    let res, signers;
    try {
      res = await fetch(
        `/rest/admin/transactions/authrecord/${authorizationRecord.txid}`
      );
      signers = await res.json();
    } catch (e) {
      console.log(e);
    }

    setSigners(signers);
  };

  useEffect(() => {
    if (authorizationRecord) {
      getAuthRecords();
    }
  }, [authorizationRecord]);

  return (
    <React.Fragment>
      <Dialog
        fullWidth
        open={!!authorizationRecord}
        onClose={() => {
          setAuthorizationRecord(null);
          setSigners([]);
        }}
        classes={{ paper: classes.modal }}
      >
        <CancelIcon
          style={{ position: "absolute", right: 8, top: 8, cursor: "pointer" }}
          onClick={() => {
            setAuthorizationRecord(null);
          }}
        />
        {authorizationRecord && (
          <AuthorizationCard
            address={authorizationRecord.to}
            amount={authorizationRecord.amount}
            symbol={authorizationRecord.symbol}
            currency={authorizationRecord.currency}
            valueSent={authorizationRecord.amountUSD}
            currentValue={authorizationRecord.amount * exchangeRate}
          />
        )}
        {signers &&
          signers.map((signer, index) => {
            return (
              <AuthorizationSignerCard
                key={index}
                address={signer.signerAddress}
                owner={signer.signerName}
                timestamp={signer.timestamp}
                index={index}
              />
            );
          })}
      </Dialog>
    </React.Fragment>
  );
}
/*
{authorizationDetails.signers.map((signer, index) => {
          return (
            <AuthorizationSignerCard key={index} {...signer} index={index} />
          );
        })}
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
  
    {
      address: "0x0KK58fj89205A3A3b26Dty66xIief5hjdd8e0wkh",
      owner: "ScrollY Check",
      timestamp: "Mar 24 2020 at 11:51",
    },
  
  ],
};
*/
