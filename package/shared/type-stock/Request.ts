import type { StockSchema } from '.';

export type PatchUpdateStock = Partial<StockSchema> & { _id: string };

export type PostBuyStock = {
  stockId: string;
  userId: string;
  company: string;
  amount: number;
  unitPrice: number;
};

export type PostSellStock = {
  stockId: string;
  userId: string;
  company: string;
  amount: number;
  unitPrice: number;
};
