import { IsString } from 'class-validator';

export class CreateRutaDto {

@IsString()
origen: string;

@IsString()
destino: string;

}
