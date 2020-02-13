import React, { useState } from 'react'

import { DonationTableStepper } from './DonationTableStepper'
import { DonationTableLeftMenu } from './DonationTableLeftMenu'

export const DonationTable = () => {

    return (
        <div>
            {/* <DonationTableLeftMenu /> */}
            <DonationTableStepper />
        </div>
    )
    /*
        This section will have the text and visuals required to explain the transfer process
        In addition to the aforementioned, there will also be a table that will display
        the funds coming in and out of UNICEF; this will pull information from the graphql API
        
    */
}