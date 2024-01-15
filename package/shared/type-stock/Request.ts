import type { StockSchema } from '.';

export type UpdateStock = Partial<Omit<StockSchema, 'unique'>>;

export type BuyStock = {
  userId: string;
  company: string;
  amount: number;
  unitPrice: number;
};

export type SellStock = {
  userId: string;
  company: string;
  amount: number;
  unitPrice: number;
};
