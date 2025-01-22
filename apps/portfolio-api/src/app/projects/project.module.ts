import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { Project, ProjectSchema } from './schemas/project.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService],
  imports: [MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }])]
})
export class ProjectModule {}
