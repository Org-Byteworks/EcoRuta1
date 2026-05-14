import { IsInt, IsString } from 'class-validator';


export class CreateHorarioDto {

@IsString()
dia: string;

@IsString()
hora: string;

@IsInt()
rutaId: number;

}
