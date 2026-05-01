import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsNumber,
} from 'class-validator';
import { QuotationStatus } from '@prisma/client';

export class CreateQuotationDto {
  @IsString()
  @IsNotEmpty()
  projectName: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(QuotationStatus)
  @IsOptional()
  status?: QuotationStatus;

  @IsNumber()
  @IsOptional()
  total?: number;

  @IsString()
  @IsOptional()
  userId?: string;
}
