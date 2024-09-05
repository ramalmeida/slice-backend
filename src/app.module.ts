import { Module } from '@nestjs/common';
import { SettlementModule } from './settlement/settlement.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.BASE_URL),
    SettlementModule,
  ],
})
export class AppModule {}
