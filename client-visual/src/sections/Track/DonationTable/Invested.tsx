import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { TransactionDetails } from "./TransactionDetails";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#f3f3f3",
  },
}));

export const Invested = () => {
  const classes = useStyles();
  function TXDetailRowCreate(
    from: string,
    recipient: string,
    amount: string,
    time: string,
    txhash: string
  ) {
    return { from, recipient, amount, time, txhash };
  }

  const TXTableRows3 = [
    TXDetailRowCreate(
      "UNICEF HQ",
      "Atix Labs",
      "1 BTC",
      "08 Oct 2019 17:16 UTC",
      "https://btc4.trezor.io/tx/8bab8a3286e7a1b2b93ed86588a98876e8de510c5e8ad3922abb2351b49b43f7"
    ),
  ];
  const TXTableRows4 = [
    TXDetailRowCreate(
      "UNICEF HQ",
      "Prescrypto",
      "49.5 ETH",
      "08 Oct 2019 15:54 UTC",
      "https://etherscan.io/tx/0x63b15553266e673f73315b93f9914a92d8208dfe8fa1d01dc119d156dc33d622"
    ),
  ];
  const TXTableRows5 = [
    TXDetailRowCreate(
      "UNICEF HQ",
      "Utopixar",
      "49.5 ETH",
      "08 Oct 2019 15:57 UTC",
      "https://etherscan.io/tx/0x5735e0524e936818369f2eac2ef7c917b74f00993d187ffdb738e287032e70a0"
    ),
  ];
  return (
    <div className={classes.root}>
      <TransactionDetails
        transactionType="Invested"
        startingParty="UNICEF HQ"
        partyType1="HQ"
        endParty="Afinidata"
        partyType3="Recipient"
        valueMoving="125 ETH"
        valueType="Crypto Received"
        TXTableRows={TXTableRows3}
        field1={"UNICEF HQ"} // from
        field2={"Afinidata"} // reciepient
        field3={"125 ETH"} // amount
        field4={""} // time
        field5={""} // tx link
      />
      <TransactionDetails
        transactionType="Invested"
        startingParty="UNICEF HQ"
        partyType1="HQ"
        endParty="Somleng"
        partyType3="Recipient"
        valueMoving="125 ETH"
        valueType="Crypto Received"
        field1="UNICEF HQ"
        field2="Somleng"
        field3="125 ETH"
      />
      <TransactionDetails
        transactionType="Invested"
        startingParty="UNICEF HQ"
        partyType1="HQ"
        endParty="Ideasis"
        partyType3="Recipient"
        valueMoving="125 ETH"
        valueType="Crypto Received"
        field1="UNICEF HQ"
        field2="Ideasis"
        field3="125 ETH"
      />
      <TransactionDetails
        transactionType="Invested"
        startingParty="UNICEF HQ"
        partyType1="HQ"
        endParty="StaTwig"
        partyType3="Recipient"
        valueMoving="125 ETH"
        valueType="Crypto Received"
        field1="UNICEF HQ"
        field2="StaTwig"
        field3="125 ETH"
      />
      <TransactionDetails
        transactionType="Invested"
        startingParty="UNICEF HQ"
        partyType1="HQ"
        endParty="W3 Engineers"
        partyType3="Recipient"
        valueMoving="125 ETH"
        valueType="Crypto Received"
        field1="UNICEF HQ"
        field2="W3"
        field3="125 ETH"
      />
      <TransactionDetails
        transactionType="Invested"
        startingParty="UNICEF HQ"
        partyType1="HQ"
        endParty="Avyantra"
        partyType3="Recipient"
        valueMoving="125 ETH"
        valueType="Crypto Received"
        field1="UNICEF HQ"
        field2="Avyantra"
        field3="125 ETH"
      />
      <TransactionDetails
        transactionType="Invested"
        startingParty="UNICEF HQ"
        partyType1="HQ"
        endParty="Cireha"
        partyType3="Recipient"
        valueMoving="125 ETH"
        valueType="Crypto Received"
        field1="UNICEF HQ"
        field2="Cireha"
        field3="125 ETH"
      />
      <TransactionDetails
        transactionType="Invested"
        startingParty="UNICEF HQ"
        partyType1="HQ"
        endParty="OS City"
        partyType3="Recipient"
        valueMoving="125 ETH"
        valueType="Crypto Received"
        field1="UNICEF HQ"
        field2="OS City"
        field3="125 ETH"
      />
      <TransactionDetails
        transactionType="Invested"
        startingParty="UNICEF HQ"
        partyType1="HQ"
        endParty="Utopic Studio"
        partyType3="Recipient"
        valueMoving="125 ETH"
        valueType="Crypto Received"
        field1="UNICEF HQ"
        field2="Utopic Studio"
        field3="125 ETH"
      />
      <TransactionDetails
        transactionType="Invested"
        startingParty="UNICEF HQ"
        partyType1="Donor"
        endParty="Prescrypto"
        partyType3="Recipient"
        valueMoving="49.5 ETH"
        valueType="Crypto Received"
        field1={"UNICEF HQ"} // from
        field2={"Prescrypto"} // reciepient
        field3={"49.5 ETH"} // amount
        field4={"08 Oct 2019 15:54 UTC"} // time
        field5={
          "https://etherscan.io/tx/0x63b15553266e673f73315b93f9914a92d8208dfe8fa1d01dc119d156dc33d622"
        } // tx link
        TXTableRows={TXTableRows4}
      />

      <TransactionDetails
        transactionType="Invested"
        startingParty="UNICEF HQ"
        partyType1="Donor"
        endParty="Utopixar"
        partyType3="Recipient"
        valueMoving="49.5 ETH"
        valueType="Crypto Received"
        field1={"UNICEF HQ"} // from
        field2={"Utopixar"} // reciepient
        field3={"49.5 ETH"} // amount
        field4={"08 Oct 2019 17:57 UTC"} // time
        field5={
          "https://etherscan.io/tx/0x5735e0524e936818369f2eac2ef7c917b74f00993d187ffdb738e287032e70a0"
        } // tx link
        TXTableRows={TXTableRows5}
      />

      <TransactionDetails
        transactionType="Invested"
        startingParty="UNICEF HQ"
        partyType1="Donor"
        endParty="Atix Labs"
        partyType3="Recipient"
        valueMoving="49.5 ETH"
        valueType="Crypto Received"
        field1={"UNICEF HQ"} // from
        field2={"Atix Labs"} // reciepient
        field3={"49.5 ETH"} // amount
        field4={"08 Oct 2019 17:16 UTC"} // time
        field5={
          "https://btc1.trezor.io/tx/001ef6f14df3b63f872c4cbdf7d3f36a15330eb9b9db4983f6c3b6d9093a8924"
        } // tx link
        TXTableRows={TXTableRows3}
      />
    </div>
  );
};
