import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';

@Injectable()
export class HorariosService {

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  // ======================================
  // Crear horario
  // ======================================
  async create(
    dto: CreateHorarioDto,
  ) {

    // Verificar si la ruta existe
    const rutaExiste =
      await this.prisma.ruta.findUnique({
        where: {
          id: dto.rutaId,
        },
      });

    if (!rutaExiste) {
      throw new BadRequestException(
        'La ruta no existe',
      );
    }

    // Verificar duplicado
    const existe =
      await this.prisma.horario.findFirst({
        where: {
          dia: dto.dia,
          hora: dto.hora,
          rutaId: dto.rutaId,
        },
      });

    if (existe) {
      throw new BadRequestException(
        'Este horario ya existe para esta ruta',
      );
    }

    // Crear horario
    return this.prisma.horario.create({
      data: {
        dia: dto.dia,
        hora: dto.hora,
        rutaId: dto.rutaId,
      },

      include: {
        ruta: true,
      },
    });
  }

  // ======================================
  // Obtener todos
  // ======================================
  findAll() {

    return this.prisma.horario.findMany({
      include: {
        ruta: true,
      },
    });
  }

  // ======================================
  // Obtener uno
  // ======================================
  async findOne(id: number) {

    const horario =
      await this.prisma.horario.findUnique({
        where: { id },

        include: {
          ruta: true,
        },
      });

    if (!horario) {
      throw new NotFoundException(
        'Horario no encontrado',
      );
    }

    return horario;
  }

  // ======================================
  // Actualizar
  // ======================================
  async update(
    id: number,
    dto: UpdateHorarioDto,
  ) {

    const horario =
      await this.prisma.horario.findUnique({
        where: { id },
      });

    if (!horario) {
      throw new NotFoundException(
        'Horario no encontrado',
      );
    }

    return this.prisma.horario.update({
      where: { id },

      data: dto,

      include: {
        ruta: true,
      },
    });
  }

  // ======================================
  // Eliminar
  // ======================================
  async remove(id: number) {

    const horario =
      await this.prisma.horario.findUnique({
        where: { id },
      });

    if (!horario) {
      throw new NotFoundException(
        'Horario no encontrado',
      );
    }

    return this.prisma.horario.delete({
      where: { id },
    });
  }

}