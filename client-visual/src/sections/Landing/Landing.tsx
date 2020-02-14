import React, { useState } from 'react'
import { MainText } from './MainText'
import { SubText } from './SubText'
import { DonorSection } from './DonorSection'
import { ProjectsSection } from './ProjectsSection'
import { TransferSection } from './TransferSection'

interface Props {
    title: string
}

export const Landing = () => {
    return (
        <div>
            <MainText/>
            <DonorSection />
            <TransferSection/>
            <ProjectsSection/>
            <SubText/>
        </div>
    )
}