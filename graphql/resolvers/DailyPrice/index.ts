import { IResolvers } from 'apollo-server-express';
import { ObjectId } from 'mongodb';
import { Database, DailyPrice } from '../../../lib/types';

export const dailyPriceResolvers: IResolvers = {
  DailyPrice: {
    id: (dailyPrice: DailyPrice): string => dailyPrice._id.toString(),
  },
  Query: {
    dailyPrices: async (
      _root: undefined,
      _args: {},
      { db }: { db: Database })
        : Promise<DailyPrice[]> => await db.dailyPrices.find({}).toArray(),
  },
  Mutation: {
    addDailyPrice: async (
      _root: undefined,
      {
        currency,
        priceBinance,
        priceCoinbasePro,
        priceBitstamp,
        averagePrice,
      } : {
                currency: string,
                priceBinance: string,
                priceCoinbasePro: string,
                priceBitstamp: string,
                averagePrice: string,
                date: string
            },
      { db }: { db: Database },
    ): Promise<DailyPrice> => {
      const createRes = await db.dailyPrices.insertOne({
        _id: new ObjectId(),
        currency,
        priceBinance,
        priceCoinbasePro,
        priceBitstamp,
        averagePrice,
        date: new Date().toString(),
      });
      if (!createRes.ops[0]) {
        throw new Error('failed to create result');
      }
      return createRes.ops[0];
    },
    editDailyPrice: () => 'Editing daily price',
    deleteDailyPrice: async (
      _root: undefined,
      { id }: { id: string },
      { db }: { db: Database },
    ): Promise<DailyPrice> => {
      const deleteRes = await db.dailyPrices.findOneAndDelete({
        _id: new ObjectId(id),
      });
      if (!deleteRes.value) {
        throw new Error('failed to delete result');
      }
      return deleteRes.value;
    },
  },
};
