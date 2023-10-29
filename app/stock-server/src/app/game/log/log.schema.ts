import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';

@Schema()
export class Log {
  @Prop()
  nickname: string;

  @Prop()
  date: Date;

  @Prop({ type: SchemaTypes.String })
  action: 'BUY' | 'SELL';

  @Prop()
  company: string;

  @Prop()
  price: number;

  @Prop()
  quantity: number;

  constructor(partial: Partial<Log>) {
    Object.assign(this, partial);
  }
}

export type LogDocument = HydratedDocument<Log>;

export const logSchema = SchemaFactory.createForClass(Log);
