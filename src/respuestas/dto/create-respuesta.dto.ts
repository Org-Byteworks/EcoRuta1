import { IsInt, IsString } from 'class-validator';

export class CreateRespuestaDto {

@IsString()
mensaje: string;

@IsInt()
quejaId: number;

}
