import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  projectName: string;

  @IsString()
  @IsNotEmpty()
  projectType: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];
}
