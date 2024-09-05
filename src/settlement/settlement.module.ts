import { Module } from '@nestjs/common';
import { SettlementService } from './settlement.service';
import { SettlementController } from './settlement.controller';
import { Settlement, SettlementSchema } from './schemas/settlement.schemas';
import { MongooseModule } from '@nestjs/mongoose';
import { ParseTxtService } from './parse-txt.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Settlement.name, schema: SettlementSchema }]),
  ],
  providers: [SettlementService, ParseTxtService],
  controllers: [SettlementController],
})
export class SettlementModule {}
