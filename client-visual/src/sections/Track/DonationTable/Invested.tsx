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
  const TXTableRows6 = [
    TXDetailRowCreate(
      "UNICEF HQ",
      "Afinidata",
      "125 ETH",
      "18 Jun 2020 08:06 UTC",
      "https://etherscan.io/tx/0x5a20f875d51ec96726ae484e9083cb3a93b0d2ced74692f473f8822b8722f20e"
    ),
  ];
  const TXTableRows7 = [
    TXDetailRowCreate(
      "UNICEF HQ",
      "Somleng",
      "125 ETH",
      "18 Jun 2020 08:06 UTC",
      "https://etherscan.io/tx/0xea13d93f88bc5cc1c86b0c57e60ef0bd6a6c4446c623acc2622da7fbcbfec3e8"
    ),
  ];
  const TXTableRows8 = [
    TXDetailRowCreate(
      "UNICEF HQ",
      "Ideasis",
      "125 ETH",
      "18 Jun 2020 07:57 UTC",
      "https://etherscan.io/tx/0x776e0b64c76f58b7521e4e6de44026cfb6f2aa7186bc127b302544faabf83c5a"
    ),
  ];
  const TXTableRows9 = [
    TXDetailRowCreate(
      "UNICEF HQ",
      "StaTwig",
      "125 ETH",
      "18 Jun 2020 07:52 UTC",
      "https://etherscan.io/tx/0x36a083becc6d49514c4fa8dc61ea398f01be0e681d9b79d640eccbf5bd4d80e4"
    ),
  ];
  const TXTableRows10 = [
    TXDetailRowCreate(
      "UNICEF HQ",
      "Avyantra",
      "125 ETH",
      "18 Jun 2020 07:52 UTC",
      "https://etherscan.io/tx/0x36a083becc6d49514c4fa8dc61ea398f01be0e681d9b79d640eccbf5bd4d80e4"
    ),
  ];
  const TXTableRows11 = [
    TXDetailRowCreate(
      "UNICEF HQ",
      "Cireha",
      "125 ETH",
      "18 Jun 2020 07:50 UTC",
      "https://etherscan.io/tx/0xe7951d7a78fa3581c48b8914c7f2c5737aeeab29989f65763c21bd1fa2134b06"
    ),
  ];
  const TXTableRows12 = [
    TXDetailRowCreate(
      "UNICEF HQ",
      "OS City",
      "125 ETH",
      "18 Jun 2020 07:44 UTC",
      "https://etherscan.io/tx/0x7df0ef84451e66e26046bb896c9ea7d4ab589b97c3fa80c080d18d0b3e22be1b"
    ),
  ];
  const TXTableRows13 = [
    TXDetailRowCreate(
      "UNICEF HQ",
      "Utopic Studio",
      "125 ETH",
      "18 Jun 2020 07:41 UTC",
      "https://etherscan.io/tx/0x30e928db6a6eb5d88bbdb8c19202308047683be8dd4b4f80fbe49db6c9e56cb9"
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
        TXTableRows={TXTableRows6}
        field1={"UNICEF HQ"} // from
        field2={"Afinidata"} // reciepient
        field3={"125 ETH"} // amount
        field4={"18 Jun 2020 08:06 UTC"} // time
        field5={
          "https://etherscan.io/tx/0x5a20f875d51ec96726ae484e9083cb3a93b0d2ced74692f473f8822b8722f20e"
        } // tx link
      />
      <TransactionDetails
        transactionType="Invested"
        startingParty="UNICEF HQ"
        partyType1="HQ"
        endParty="Somleng"
        partyType3="Recipient"
        valueMoving="125 ETH"
        valueType="Crypto Received"
        TXTableRows={TXTableRows7}
        field1="UNICEF HQ"
        field2="Somleng"
        field3="125 ETH"
        field4={"18 Jun 2020 08:06 UTC"} // time
        field5={
          "https://etherscan.io/tx/0xea13d93f88bc5cc1c86b0c57e60ef0bd6a6c4446c623acc2622da7fbcbfec3e8"
        } // tx link
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
        TXTableRows={TXTableRows8}
        field4={"18 Jun 2020 07:57 UTC"} // time
        field5={
          "https://etherscan.io/tx/0x776e0b64c76f58b7521e4e6de44026cfb6f2aa7186bc127b302544faabf83c5a"
        } // tx link
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
        TXTableRows={TXTableRows9}
        field4={"18 Jun 2020 07:52 UTC"} // time
        field5={
          "https://etherscan.io/tx/0x36a083becc6d49514c4fa8dc61ea398f01be0e681d9b79d640eccbf5bd4d80e4"
        } // tx link
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
        TXTableRows={TXTableRows10}
        field2="Avyantra"
        field3="125 ETH"
        field4={"18 Jun 2020 07:52 UTC"} // time
        field5={
          "https://etherscan.io/tx/0x36a083becc6d49514c4fa8dc61ea398f01be0e681d9b79d640eccbf5bd4d80e4"
        } // tx link
      />
      <TransactionDetails
        transactionType="Invested"
        startingParty="UNICEF HQ"
        partyType1="HQ"
        endParty="Cireha"
        partyType3="Recipient"
        valueMoving="125 ETH"
        TXTableRows={TXTableRows11}
        valueType="Crypto Received"
        field1="UNICEF HQ"
        field2="Cireha"
        field3="125 ETH"
        field4={"18 Jun 2020 07:50 UTC"} // time
        field5={
          "https://etherscan.io/tx/0xe7951d7a78fa3581c48b8914c7f2c5737aeeab29989f65763c21bd1fa2134b06"
        } // tx link
      />
      <TransactionDetails
        transactionType="Invested"
        startingParty="UNICEF HQ"
        partyType1="HQ"
        endParty="OS City"
        partyType3="Recipient"
        TXTableRows={TXTableRows12}
        valueMoving="125 ETH"
        valueType="Crypto Received"
        field1="UNICEF HQ"
        field2="OS City"
        field3="125 ETH"
        field4={"18 Jun 2020 07:44 UTC"} // time
        field5={
          "https://etherscan.io/tx/0x7df0ef84451e66e26046bb896c9ea7d4ab589b97c3fa80c080d18d0b3e22be1b"
        } // tx link
      />
      <TransactionDetails
        transactionType="Invested"
        startingParty="UNICEF HQ"
        partyType1="HQ"
        endParty="Utopic Studio"
        partyType3="Recipient"
        valueMoving="125 ETH"
        valueType="Crypto Received"
        TXTableRows={TXTableRows13}
        field1="UNICEF HQ"
        field2="Utopic Studio"
        field3="125 ETH"
        field4={"18 Jun 2020 07:41 UTC"} // time
        field5={
          "https://etherscan.io/tx/0x30e928db6a6eb5d88bbdb8c19202308047683be8dd4b4f80fbe49db6c9e56cb9"
        } // tx link
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
