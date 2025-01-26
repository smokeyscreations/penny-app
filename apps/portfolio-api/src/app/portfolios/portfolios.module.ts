import { Module } from '@nestjs/common';
import { PortfoliosService } from './portfolios.service';
import { PortfoliosController } from './portfolios.controller';
import { Portfolio, PortfolioSchema } from './schemas/portfolio.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [PortfoliosController],
  providers: [PortfoliosService],
  imports: [MongooseModule.forFeature([{ name: Portfolio.name, schema: PortfolioSchema }])],
})
export class PortfoliosModule {}
