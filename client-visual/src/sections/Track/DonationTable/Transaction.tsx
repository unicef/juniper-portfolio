import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { TransactionDetails } from "./TransactionDetails";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#f3f3f3",
  },
}));

export const Transaction = () => {
  const classes = useStyles();

  const TXTableRows1 = [
    TXDetailRowCreate(
      "Ethereum Foundation",
      "UNICEF France",
      "100 ETH",
      "07 Oct 2019 13:56 UTC",
      "https://etherscan.io/tx/0x659566ad82bf3fb89c54b3ce25583df0138605272381aaf7ff3883b2d9e651e0"
    ),
    TXDetailRowCreate(
      "UNICEF France",
      "UNICEF HQ",
      "100 ETH",
      "07 Oct 2019 15:08 UTC",
      "https://etherscan.io/tx/0xec285bbbe747076618ebcaf13f44553cbef068ee330c73a83cce8c356ef259e6"
    ),
  ];
  const TXTableRows2 = [
    TXDetailRowCreate(
      "Ethereum Foundation",
      "UNICEF France",
      "1 BTC",
      "07 Oct 2019 14:02 UTC",
      "https://btc4.trezor.io/tx/8bab8a3286e7a1b2b93ed86588a98876e8de510c5e8ad3922abb2351b49b43f7"
    ),
    TXDetailRowCreate(
      "UNICEF France",
      "UNICEF HQ",
      "1 BTC",
      "07 Oct 2019 15:57 UTC",
      "https://btc4.trezor.io/tx/396e16f8ec98dacfc56ee0b0c00aedc1a94af203050b428ae7eb08d17019846b"
    ),
  ];
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
      {/** NEW */}
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
        field4={""} // time
        field5={""} // tx link
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
        field4={""} // time
        field5={""} // tx link
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
        field4={""} // time
        field5={""} // tx link
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
        field4={""} // time
        field5={""} // tx link
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
        field4={""} // time
        field5={""} // tx link
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
        field4={""} // time
        field5={""} // tx link
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
        field4={""} // time
        field5={""} // tx link
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
        field4={""} // time
        field5={""} // tx link
      />
      <TransactionDetails
        transactionType="Received"
        startingParty="Ethereum Foundation"
        partyType1="Donor"
        middleParty="UNICEF France"
        partyType2="National Committee"
        endParty="UNICEF HQ"
        partyType3="Recipient"
        valueMoving="1200 ETH"
        valueType="Crypto Received"
        TXTableRows={TXTableRows1}
        field1={"Ethereum Foundation"} // from
        field2={"UNICEF France"} // reciepient
        field3={"1200 ETH"} // amount
        field4={"15 Jun 2020 17:03 UTC"} // time
        field5={
          "https://etherscan.io/tx/0x7034df9c87f950902d0f3a2f431aebea854c0d2e2fa6dca8ab127362711bbd11"
        } // tx link
        yes={true}
        field6={"UNICEF France"} // from
        field7={"UNICEF HQ"} // reciepient
        field8={"1200 ETH"} // amount
        field9={"15 Jun 2020 17:47 UTC"} // time
        field10={
          "https://etherscan.io/tx/0xc402f498a730b99d0105cfa3b49c483bd6f143a8c0ab082d0e2b63e8de3fd854"
        } // tx link
      />
      {/** OLD */}

      <TransactionDetails
        transactionType="Invested"
        startingParty="UNICEF HQ"
        partyType1="HQ"
        endParty="Atix Labs"
        partyType3="Recipient"
        valueMoving="1 BTC"
        valueType="Crypto Received"
        TXTableRows={TXTableRows3}
        field1={"UNICEF HQ"} // from
        field2={"Atix Labs"} // reciepient
        field3={"1 BTC"} // amount
        field4={"08 Oct 2019 17:16 UTC"} // time
        field5={
          "https://btc1.trezor.io/tx/001ef6f14df3b63f872c4cbdf7d3f36a15330eb9b9db4983f6c3b6d9093a8924"
        } // tx link
      />
      <TransactionDetails
        transactionType="Invested"
        startingParty="UNICEF HQ"
        partyType1="HQ"
        endParty="Prescrypto"
        partyType3="Recipient"
        valueMoving="49.5 ETH"
        valueType="Crypto Received"
        TXTableRows={TXTableRows4}
        field1={"UNICEF HQ"} // from
        field2={"Prescrypto"} // reciepient
        field3={"49.5 ETH"} // amount
        field4={"08 Oct 2019 15:54 UTC"} // time
        field5={
          "https://etherscan.io/tx/0x63b15553266e673f73315b93f9914a92d8208dfe8fa1d01dc119d156dc33d622"
        } // tx link
      />

      <TransactionDetails
        transactionType="Invested"
        startingParty="UNICEF HQ"
        partyType1="HQ"
        endParty="Utopixar"
        partyType3="Recipient"
        valueMoving="49.5 ETH"
        valueType="Crypto Received"
        TXTableRows={TXTableRows5}
        field1={"UNICEF HQ"} // from
        field2={"Utopixar"} // reciepient
        field3={"49.5 ETH"} // amount
        field4={"08 Oct 2019 17:57 UTC"} // time
        field5={
          "https://etherscan.io/tx/0x5735e0524e936818369f2eac2ef7c917b74f00993d187ffdb738e287032e70a0"
        } // tx link
      />
      <TransactionDetails
        transactionType="Received"
        startingParty="Ethereum Foundation"
        partyType1="Donor"
        middleParty="UNICEF France"
        partyType2="National Committee"
        endParty="UNICEF HQ"
        partyType3="Recipient"
        valueMoving="100 ETH"
        valueType="Crypto Received"
        TXTableRows={TXTableRows1}
        field1={"Ethereum Foundation"} // from
        field2={"UNICEF France"} // reciepient
        field3={"100 ETH"} // amount
        field4={"07 Oct 2019 13:56 UTC"} // time
        field5={
          "https://etherscan.io/tx/0x659566ad82bf3fb89c54b3ce25583df0138605272381aaf7ff3883b2d9e651e0"
        } // tx link
        yes={true}
        field6={"UNICEF France"} // from
        field7={"UNICEF HQ"} // reciepient
        field8={"100 ETH"} // amount
        field9={"07 Oct 2019 15:08 UTC"} // time
        field10={
          "https://etherscan.io/tx/0xec285bbbe747076618ebcaf13f44553cbef068ee330c73a83cce8c356ef259e6"
        } // tx link
      />
      <TransactionDetails
        transactionType="Received"
        startingParty="Ethereum Foundation"
        partyType1="Donor"
        middleParty="UNICEF France"
        partyType2="National Committee"
        endParty="UNICEF HQ"
        partyType3="Recipient"
        valueMoving="1 BTC"
        valueType="Crypto Received"
        TXTableRows={TXTableRows2}
        field1={"Ethereum Foundation"} // from
        field2={"UNICEF France"} // reciepient
        field3={"1 BTC"} // amount
        field4={"07 Oct 2019 14:02 UTC"} // time
        field5={
          "https://btc1.trezor.io/tx/8bab8a3286e7a1b2b93ed86588a98876e8de510c5e8ad3922abb2351b49b43f7"
        } // tx link
        yes={true}
        field6={"UNICEF France"} // from
        field7={"UNICEF HQ"} // reciepient
        field8={"1 BTC"} // amount
        field9={"07 Oct 2019 15:57 UTC"} // time
        field10={
          "https://btc1.trezor.io/tx/396e16f8ec98dacfc56ee0b0c00aedc1a94af203050b428ae7eb08d17019846b"
        } // tx link
      />
    </div>
  );
};

function TXDetailRowCreate(
  from: string,
  recipient: string,
  amount: string,
  time: string,
  txhash: string
) {
  return { from, recipient, amount, time, txhash };
}
