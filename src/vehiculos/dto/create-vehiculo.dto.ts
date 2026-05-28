import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import { Type } from 'class-transformer';

export class CreateVehiculoDto {

  @IsString()
  @IsNotEmpty()
  placa: string;

  @IsString()
  @IsNotEmpty()
  tipo: string;

  @IsString()
  @IsNotEmpty()
  conductor: string;

  @IsOptional()
  @IsString()
  capacidad?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  rutaId?: number;

}