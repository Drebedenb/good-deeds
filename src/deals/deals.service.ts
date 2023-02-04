import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDealDto } from './dto/create-deal.dto';
import { UpdateDealDto } from './dto/update-deal.dto';
import { Deal, DealDocument } from './shemas/deal.shema';

@Injectable()
export class DealsService {


    constructor(@InjectModel(Deal.name) private dealModel: Model<DealDocument>) {

    }
    private deals = [];

    async getAll(): Promise<Deal[]> {
        return this.dealModel.find().exec();
    }

    async getById(id: string): Promise<Deal> {
        return this.dealModel.findById(id);
    }

    async create(dealDto: CreateDealDto): Promise<Deal> {
        const newDeal = new this.dealModel(dealDto);
        return newDeal.save();
    }

    async remove(id: string): Promise<Deal> {
        return this.dealModel.findByIdAndRemove(id);
    }

    async update(id: string, dealDto: UpdateDealDto): Promise<Deal> {
        return this.dealModel.findByIdAndUpdate(id, dealDto, {new: true});
    }
}