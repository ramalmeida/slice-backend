import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Settlement, SettlementDocument } from './schemas/settlement.schemas';

@Injectable()
export class SettlementService {
  constructor(
    @InjectModel(Settlement.name) private settlementModel: Model<SettlementDocument>,
  ) {}

  async createSettlement(settlementData: Partial<Settlement>): Promise<Settlement> {
    const createdSettlement = new this.settlementModel(settlementData);
    return createdSettlement.save();
  }

  async getAllSettlements(): Promise<Settlement[]> {
    return this.settlementModel.find().exec();
  }
}
