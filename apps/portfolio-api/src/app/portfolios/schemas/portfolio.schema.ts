// src/app/portfolios/schemas/portfolio.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type PortfolioDocument = HydratedDocument<Portfolio>;

@Schema({ timestamps: true })
export class Portfolio {
  @Prop({ required: true })
  title: string;

  @Prop()
  portfolioSummary?: string;

  @Prop({
    type: {
      start: { type: Date },
      end: { type: Date },
    },
    default: undefined,
  })
  dateRange?: { start: Date; end: Date };

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const PortfolioSchema = SchemaFactory.createForClass(Portfolio);
