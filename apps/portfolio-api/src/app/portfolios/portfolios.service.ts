// src/app/portfolios/portfolios.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Portfolio } from './schemas/portfolio.schema';

@Injectable()
export class PortfoliosService {
  constructor(
    @InjectModel(Portfolio.name) private portfolioModel: Model<Portfolio>,
  ) {}

  async create(createDto: CreatePortfolioDto): Promise<Portfolio> {
    const createdPortfolio = await this.portfolioModel.create({
      title: createDto.title,
      portfolioSummary: createDto.portfolioSummary,
      dateRange: createDto.dateRange,
      user: createDto.userId,
    });
    return createdPortfolio.populate('user');
  }

  async findAllByUser(userId: string): Promise<Portfolio[]> {
    return this.portfolioModel
      .find({ user: userId })
      .populate('user')
      .exec();
  }

  async findOneByIdAndUser(portfolioId: string, userId: string): Promise<Portfolio> {
    const portfolio = await this.portfolioModel
      .findOne({ _id: portfolioId, user: userId })
      .populate('user')
      .exec();

    if (!portfolio) {
      throw new NotFoundException('Portfolio not found or not yours');
    }
    return portfolio;
  }

  async removeByIdAndUser(portfolioId: string, userId: string): Promise<Portfolio> {
    const removed = await this.portfolioModel
      .findOneAndDelete({ _id: portfolioId, user: userId })
      .exec();
  
    if (!removed) {
      throw new NotFoundException('Portfolio not found or not yours');
    }
  
    return removed;
  }
}
