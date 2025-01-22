import { Injectable } from '@nestjs/common';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { Portfolio } from './schemas/portfolio.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PortfoliosService {

  constructor(@InjectModel(Portfolio.name) private portfolioModel: Model<Portfolio>) {}
  create(createPortfolioDto: CreatePortfolioDto) {
    const createdPortfolio = this.portfolioModel.create({
      title: createPortfolioDto.title,
      portfolioSummary: createPortfolioDto.portfolioSummary,
      dateRange: createPortfolioDto.dateRange,
      projects: createPortfolioDto.projects,
      user: createPortfolioDto.userId,
    });

    return createdPortfolio.then((doc) =>{
      return doc.populate(['user'])
    });
  }

  async findAll() {
    return await this.portfolioModel.find().populate(['user']).exec();
  }

  async getPortfolioById(portfolioId: string) {
    return await this.portfolioModel.find({
      _id: portfolioId,
    }).populate(['user']).exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} portfolio`;
  }

  update(id: number, updatePortfolioDto: UpdatePortfolioDto) {
    return `This action updates a #${id} portfolio`;
  }

  remove(id: number) {
    return `This action removes a #${id} portfolio`;
  }
}
