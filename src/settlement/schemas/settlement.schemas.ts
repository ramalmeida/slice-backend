import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SettlementDocument = Settlement & Document;

@Schema()
export class Settlement {
  @Prop()
  type: string;

  @Prop()
  totalPurchasesBRL: number;

  @Prop()
  totalWithdrawalsBRL: number;

  @Prop()
  totalNetSettlementBRL: number;

  @Prop()
  totalPurchasesUSD: number;

  @Prop()
  totalWithdrawalsUSD: number;

  @Prop()
  totalNetSettlementUSD: number;
}

export const SettlementSchema = SchemaFactory.createForClass(Settlement);
