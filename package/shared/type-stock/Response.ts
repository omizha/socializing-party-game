import { StockLogSchema, ResultSchema, StockSchema } from '.';

export type UploadAvatar = {
  // Express 타입을 왜 못찾을까?
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  file: Express.Multer.File;
};

export type GetStockPhase = {
  stockPhase: StockSchema['stockPhase'];
};

export type Stock = StockSchema;

export type Log = StockLogSchema;

export type Result = ResultSchema;
