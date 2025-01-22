import { IsString, IsOptional, IsArray, ValidateNested, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateProjectDto } from '../../projects/dto/create-project.dto';

class DateRangeDto {
  @IsOptional()
  start?: Date;

  @IsOptional()
  end?: Date;
}

export class CreatePortfolioDto {
  @IsString()
  title: string;

  @IsString()
  portfolioSummary: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => DateRangeDto)
  dateRange?: DateRangeDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProjectDto)
  projects?: CreateProjectDto[];
  
  userId: string;
}
