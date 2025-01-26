// src/app/portfolios/portfolios.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  UseGuards,
  UnauthorizedException,
  Delete,
} from '@nestjs/common';
import { Request } from 'express';
import { PortfoliosService } from './portfolios.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { AuthenticationGuard } from '../auth/auth.guard.';
import { JwtService } from '@nestjs/jwt';

@UseGuards(AuthenticationGuard)
@Controller('portfolios')
export class PortfoliosController {
  constructor(
    private readonly portfoliosService: PortfoliosService,
    private readonly jwtService: JwtService,
  ) {}

  @Post()
  async create(@Body() createPortfolioDto: CreatePortfolioDto, @Req() request: Request) {
    const cookie = (request as any).cookies?.['jwt'];
    if (!cookie) {
      throw new UnauthorizedException('No JWT cookie found');
    }

    const data = await this.jwtService.verifyAsync(cookie);
    if (!data) {
      throw new UnauthorizedException('Invalid or expired token');
    }
    createPortfolioDto.userId = data.sub;

    return this.portfoliosService.create(createPortfolioDto);
  }

  @Get()
  async findAll(@Req() request: Request) {
    const cookie = (request as any).cookies?.['jwt'];
    if (!cookie) {
      throw new UnauthorizedException('No JWT cookie found');
    }

    const data = await this.jwtService.verifyAsync(cookie);
    if (!data) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    return this.portfoliosService.findAllByUser(data.sub);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() request: Request) {
    const cookie = (request as any).cookies?.['jwt'];
    if (!cookie) {
      throw new UnauthorizedException('No JWT cookie found');
    }

    const data = await this.jwtService.verifyAsync(cookie);
    if (!data) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    return this.portfoliosService.findOneByIdAndUser(id, data.sub);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() request: Request) {
    const cookie = (request as any).cookies?.['jwt'];
    if (!cookie) {
      throw new UnauthorizedException('No JWT cookie found');
    }

    const data = await this.jwtService.verifyAsync(cookie);
    if (!data) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    return this.portfoliosService.removeByIdAndUser(id, data.sub);
  }

}
