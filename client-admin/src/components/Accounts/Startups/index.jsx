import React from 'react'
import MainContentContainer from '../../../ui/MainContentContainer'
import PriceBar from '../../PriceBar'
import StartupSummary from './StartupSummary'
import StartupCards from './StartupCards'

export default function Startups() {
  return (
    <MainContentContainer>
      <PriceBar />
      <StartupSummary />
      <StartupCards />
    </MainContentContainer>
        )
}