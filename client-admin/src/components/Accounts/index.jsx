import React, { useState, useEffect } from "react";
import AccountLayout from "../../ui/Layout/AccountLayout";
import { CreateAccount } from "../../ui/Dialog";
import PageLayout from "../../ui/Layout/PageLayout";

export default function Accounts({
  isAdmin,
  accounts,
  ethRate,
  btcRate,
  fetchAccounts,
}) {
  const [tabs] = useState(["Startups", "Donors", "Natcoms"]);
  const [pages, setPages] = useState();
  console.log(accounts);
  useEffect(() => {
    setPages([
      <AccountLayout
        title={"Investment"}
        type={"startup"}
        addButtonText={"Create Startup Account"}
        CreateModal={CreateAccount}
        onDialogClose={fetchAccounts}
        accounts={accounts.filter((account) => account.type === "startup")}
        ethRate={ethRate}
        btcRate={btcRate}
        message={
          "The investments are made through UNICEF’s CryptoFund, in open source technology solutions that benefit children and the world."
        }
        isAdmin={isAdmin}
      />,
      <AccountLayout
        title={"Investment"}
        type={"donor"}
        addButtonText={"Create Donor Account"}
        CreateModal={CreateAccount}
        onDialogClose={fetchAccounts}
        accounts={accounts.filter((account) => account.type === "donor")}
        ethRate={ethRate}
        btcRate={btcRate}
        message={
          "In line with current UNICEF practice, each crypto transaction is initiated after UNICEF has completed due diligence on a donor, ensuring a credible source of the donation."
        }
        isAdmin={isAdmin}
      />,
      <AccountLayout
        title={"Investment"}
        type={"natcom"}
        addButtonText={"Create Natcom Account"}
        CreateModal={CreateAccount}
        onDialogClose={fetchAccounts}
        accounts={accounts.filter((account) => account.type === "natcom")}
        ethRate={ethRate}
        btcRate={btcRate}
        message={
          "Cryptofund donations are received by HQ through four National Committees - Australia, France, New Zealand and the United States."
        }
        isAdmin={isAdmin}
      />,
    ]);
  }, [accounts, btcRate, ethRate]);

  return <PageLayout tabs={tabs} pages={pages}></PageLayout>;
}
