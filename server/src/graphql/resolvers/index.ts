import merge from 'lodash.merge'

import { blockchainTransactionResolvers } from './BlockchainTransaction'
import { userResolvers } from './User'
import { dailyPriceResolvers } from './DailyPrice'
import { donorResolvers } from './Donor'

export const resolvers = merge(blockchainTransactionResolvers, userResolvers, dailyPriceResolvers, donorResolvers)