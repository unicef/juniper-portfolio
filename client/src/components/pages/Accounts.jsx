import React, { useState } from "react";
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
  const [tabs] = useState(["Payees", "Donors", "Natcoms"]);

  return (
    <PageLayout tabs={tabs}>
      <AccountLayout
        title={"Investment"}
        type={"payee"}
        addButtonText={"Create Payee Account"}
        CreateModal={CreateAccount}
        onDialogClose={fetchAccounts}
        accounts={accounts.filter((account) => account.type === "payee")}
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
          "In line with UNICEF practices, donors must be vetted by established processes before donating to the Cryptofund."
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
          "CryptoFund donations are received through National Committees and transferred to HQ."
        }
        isAdmin={isAdmin}
      />
    </PageLayout>
  );
}
