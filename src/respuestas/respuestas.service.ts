import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateRespuestaDto } from './dto/create-respuesta.dto';
import { UpdateRespuestaDto } from './dto/update-respuesta.dto';

@Injectable()
export class RespuestasService {

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  // ======================================
  // Crear respuesta
  // ======================================
  async create(
    dto: CreateRespuestaDto,
  ) {

    // Verificar que la queja exista
    const queja =
      await this.prisma.queja.findUnique({
        where: {
          id: dto.quejaId,
        },
      });

    if (!queja) {
      throw new BadRequestException(
        'La queja no existe',
      );
    }

    return this.prisma.respuesta.create({

      data: dto,

      include: {
        queja: true,
      },
    });
  }

  // ======================================
  // Obtener todas las respuestas
  // ======================================
  findAll() {

    return this.prisma.respuesta.findMany({

      include: {
        queja: true,
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // ======================================
  // Obtener una respuesta
  // ======================================
  async findOne(id: number) {

    const respuesta =
      await this.prisma.respuesta.findUnique({

        where: { id },

        include: {
          queja: true,
        },
      });

    if (!respuesta) {
      throw new NotFoundException(
        'Respuesta no encontrada',
      );
    }

    return respuesta;
  }

  // ======================================
  // Actualizar respuesta
  // ======================================
  async update(
    id: number,
    dto: UpdateRespuestaDto,
  ) {

    const respuesta =
      await this.prisma.respuesta.findUnique({
        where: { id },
      });

    if (!respuesta) {
      throw new NotFoundException(
        'Respuesta no encontrada',
      );
    }

    return this.prisma.respuesta.update({

      where: { id },

      data: dto,

      include: {
        queja: true,
      },
    });
  }

  // ======================================
  // Eliminar respuesta
  // ======================================
  async remove(id: number) {

    const respuesta =
      await this.prisma.respuesta.findUnique({
        where: { id },
      });

    if (!respuesta) {
      throw new NotFoundException(
        'Respuesta no encontrada',
      );
    }

    return this.prisma.respuesta.delete({
      where: { id },
    });
  }

}