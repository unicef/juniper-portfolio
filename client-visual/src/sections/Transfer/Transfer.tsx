import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from 'react-apollo'
import { DonationFlowDiagram } from './DonationFlowDiagram'
import { DonationFlowExplainer } from './DonationFlowExplainer'
import { TransferText } from './TransferText'
import { DonationTable } from './DonationTable'

interface Props {
    title: string
}

export const Transfer = () => {

    return (
        <div>
            <h1>Transfer</h1>
            <DonationFlowDiagram />
            <DonationFlowExplainer />
            <TransferText />
            <DonationTable />
        </div>
    )
    /*
        This section will have the text and visuals required to explain the transfer process
        In addition to the aforementioned, there will also be a table that will display
        the funds coming in and out of UNICEF; this will pull information from the graphql API
        
    */
}