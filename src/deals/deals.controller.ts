import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { DealsService } from './deals.service';
import { CreateDealDto } from './dto/create-deal.dto';
import { UpdateDealDto } from './dto/update-deal.dto';
import { Deal } from './shemas/deal.shema';

@Controller('deals')
export class DealsController {

   constructor(private readonly dealsService: DealsService) {

   }

    @Get()
    getAll(): Promise<Deal[]> {
        return this.dealsService.getAll();
    }

    @Get(':id')
    getDeal(@Param("id") id: string): Promise<Deal>  {
        return this.dealsService.getById(id);
     }

     @Post()
     @HttpCode(HttpStatus.CREATED)
     createDeal(@Body() createDealDto: CreateDealDto): Promise<Deal> {
        return this.dealsService.create(createDealDto);
     }

     @Delete(':id')
     deleteDeal(@Param("id") id: string):Promise<Deal> {
        return this.dealsService.remove(id);
     }

     @Put(':id')
     updateDeal(@Body() updateDealDto:UpdateDealDto, @Param("id") id: string): Promise<Deal> {
        return this.dealsService.update(id, updateDealDto);
     }

}
