import React from 'react'
import { InvestmentDetails } from './InvestmentDetails'
import { InvestmentTable } from './InvestmentTable'
import { InvestmentText } from './InvestmentText'

interface Props {
    title: string
}

export const Investment = () => {

    return(
        <div>
            <InvestmentText/>
            <InvestmentDetails/>
            <InvestmentTable/>
        </div>
    )
}