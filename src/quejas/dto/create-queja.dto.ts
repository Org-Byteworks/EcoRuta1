import { IsInt, IsString } from 'class-validator';

export class CreateQuejaDto {

@IsString()
titulo: string;

@IsString()
descripcion: string;

@IsInt()
usuarioId: number;

}
