import merge from 'lodash.merge'

import { blockchainTransactionResolvers } from './BlockchainTransaction'
import { userResolvers } from './User'
import { dailyPriceResolvers } from './DailyPrice'
import { donorResolvers } from './Donor'
import { fundraisingArmResolvers } from './FundraisingArm'
import { hqResolvers } from './Hq'
import { projectResolvers } from './Project'

export const resolvers = merge(
    blockchainTransactionResolvers, 
    userResolvers, 
    dailyPriceResolvers, 
    donorResolvers, 
    fundraisingArmResolvers, 
    hqResolvers, 
    projectResolvers
)