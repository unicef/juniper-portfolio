import React from 'react'
import { DonationFlowDiagram } from './DonationFlowDiagram'
import { DonationFlowExplainer } from './DonationFlowExplainer'
import { TransferText } from './TransferText'
import { DonationTable } from './DonationTable'

export const Transfer = () => {

    return (
        <div>
            <h1>Transfer</h1>
            <TransferText />
            <DonationFlowDiagram />
            <DonationFlowExplainer />
            <DonationTable />
        </div>
    )
}