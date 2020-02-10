import React, { useState } from 'react'
import { DonorDetails } from './DonorDetails'
import { BackgroundText } from './BackgroundText'
import { DonorText } from './DonorText'
import { ThankYouDonors } from './ThankYouDonors'

interface Props {
    title: string
}

export const Fund = () => {
    return(
        <div>
            <DonorDetails/>
            <DonorText/>
            <BackgroundText/>
            <ThankYouDonors/>
        </div>
    )
}