import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from 'react-apollo'

import { DonationTableStepper } from './DonationTableStepper'
import { DonationTableLeftMenu } from './DonationTableLeftMenu'
import { Transaction } from './Transaction'
import { TransactionDetails } from './TransactionDetails'

interface Props {
    title: string
}

export const DonationTable = () => {

    return (
        <div>
            <h1>DonationTable</h1>
            <DonationTableStepper />
            <DonationTableLeftMenu />
            <Transaction />
            <TransactionDetails />
        </div>
    )
    /*
        This section will have the text and visuals required to explain the transfer process
        In addition to the aforementioned, there will also be a table that will display
        the funds coming in and out of UNICEF; this will pull information from the graphql API
        
    */
}