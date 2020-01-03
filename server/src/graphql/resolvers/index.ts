import merge from 'lodash.merge'

import { blockchainTransactionResolvers } from './BlockchainTransaction'
import { userResolvers } from './User'
import { dailyPriceResolvers } from './DailyPrice'
import { donorResolvers } from './Donor'
import { fundraisingArmResolvers } from './FundraisingArm'

export const resolvers = merge(blockchainTransactionResolvers, userResolvers, dailyPriceResolvers, donorResolvers, fundraisingArmResolvers)