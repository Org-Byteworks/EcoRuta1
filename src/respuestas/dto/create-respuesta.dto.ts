import {
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';

import { Type } from 'class-transformer';

export class CreateRespuestaDto {

  @IsString()
  @IsNotEmpty()
  mensaje: string;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  quejaId: number;

}