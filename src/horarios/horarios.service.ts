import {
  Injectable,
  BadRequestException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { UpdateHorarioDto } from './dto/update-horario.dto';

@Injectable()
export class HorariosService {

  constructor(private prisma: PrismaService) {}

  async create(data: any) {

    // Verificar si la ruta existe
    const rutaExiste =
      await this.prisma.ruta.findUnique({
        where: {
          id: data.rutaId,
        },
      });

    if (!rutaExiste) {
      throw new BadRequestException(
        'La ruta no existe',
      );
    }

    // Verificar horario duplicado
    const existe =
      await this.prisma.horario.findFirst({
        where: {
          dia: data.dia,
          hora: data.hora,
          rutaId: data.rutaId,
        },
      });

    if (existe) {
      throw new BadRequestException(
        'Este horario ya existe para esta ruta',
      );
    }

    return this.prisma.horario.create({
      data: {
        dia: data.dia,
        hora: data.hora,
        rutaId: data.rutaId,
      },
    });

  }

  findAll() {

    return this.prisma.horario.findMany({
      include: {
        ruta: true,
      },
    });

  }

  async update(
    id: number,
    dto: UpdateHorarioDto,
  ) {

    return this.prisma.horario.update({
      where: { id },
      data: dto,
    });

  }

}