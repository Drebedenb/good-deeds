import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DealsModule } from './deals/deals.module';
import config from "../config";

@Module({
  imports: [
    DealsModule,
    MongooseModule.forRoot(config.mongoUri)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
