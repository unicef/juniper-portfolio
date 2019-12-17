import merge from 'lodash.merge'

import { blockchainTransactionResolvers } from './BlockchainTransaction'
import { userResolvers } from './User'
import { dailyPriceResolvers } from './DailyPrice'

export const resolvers = merge(blockchainTransactionResolvers, userResolvers, dailyPriceResolvers)