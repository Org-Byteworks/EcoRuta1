import {
  IsInt,
  IsString,
} from 'class-validator';

export class CreateBarrioDto {

  @IsString()
  nombre: string;

  @IsInt()
  rutaId: number;

}