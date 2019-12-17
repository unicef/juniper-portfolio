import React from "react";
import { render } from "react-dom";
import { BlockchainTransactions, DailyPrices, Donors, FundraisingArms, Hqs, Projects, Transactions } from "./sections";
import * as serviceWorker from "./serviceWorker";

render(
    <div>
        <BlockchainTransactions title='Blockchain Transactions' />
        <DailyPrices title='Daily Prices' />
        <Donors title='Donors' />
        <FundraisingArms title='Fundraising Arms' />
        <Hqs title='Hqs' />
        <Projects title='Projects' />
        <Transactions title='Transactions' />
    </div>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
