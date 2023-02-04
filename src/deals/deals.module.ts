import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DealsController } from "./deals.controller";
import { DealsService } from "./deals.service";
import { Deal, DealSchema } from "./shemas/deal.shema";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Deal.name, schema: DealSchema }])
    ],
    providers: [DealsService],
    controllers: [DealsController]
})

export class DealsModule {
       
}