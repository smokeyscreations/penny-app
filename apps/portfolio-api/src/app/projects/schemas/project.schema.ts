import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProjectDocument = HydratedDocument<Project>;

@Schema()
export class Project {
  @Prop({ required: true })
  projectName: string;

  @Prop({ required: true })
  projectType: string;

  @Prop()
  description?: string;

  @Prop({ required: true, default: Date.now })
  dateCreated: Date;

  @Prop({ type: [String], default: [] })
  images: string[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
