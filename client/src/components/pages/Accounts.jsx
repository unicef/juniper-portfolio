import React, { useState, useEffect } from "react";
import AccountLayout from "../templates/Account";
import { CreateAccount } from "../organisms/Dialog";
import PageLayout from "../templates/Page";

export default function AccountPage({
  isAdmin,
  accounts,
  ethRate,
  btcRate,
  fetchAccounts,
}) {
  const [tabs] = useState(["Startups", "Donors", "Natcoms"]);

  useEffect(() => {
    console.log("why in the flying fuck has this not updated");
    console.log(accounts);
  }, [accounts, btcRate, ethRate]);

  return (
    <PageLayout tabs={tabs}>
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
      />

      <AccountLayout
        title={"Donation"}
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
      />

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
      />
    </PageLayout>
  );
}
