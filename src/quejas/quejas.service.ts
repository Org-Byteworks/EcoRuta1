import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateQuejaDto } from './dto/create-queja.dto';
import { UpdateQuejaDto } from './dto/update-queja.dto';

@Injectable()
export class QuejasService {

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  // ======================================
  // Crear queja
  // ======================================
  async create(
    dto: CreateQuejaDto,
  ) {

    // Generar código único
    const codigo =
      `ECO-${Date.now()}`;

    return this.prisma.queja.create({

      data: {
        ...dto,
        codigoSeguimiento: codigo,
      },

      include: {
        respuestas: true,
      },
    });
  }

  // ======================================
  // Obtener todas las quejas
  // ======================================
  findAll() {

    return this.prisma.queja.findMany({

      include: {
        respuestas: true,
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // ======================================
  // Obtener una queja
  // ======================================
  async findOne(id: number) {

    const queja =
      await this.prisma.queja.findUnique({

        where: { id },

        include: {
          respuestas: true,
        },
      });

    if (!queja) {
      throw new NotFoundException(
        'Queja no encontrada',
      );
    }

    return queja;
  }

  // ======================================
  // Actualizar queja
  // ======================================
  async update(
    id: number,
    dto: UpdateQuejaDto,
  ) {

    const queja =
      await this.prisma.queja.findUnique({
        where: { id },
      });

    if (!queja) {
      throw new NotFoundException(
        'Queja no encontrada',
      );
    }

    return this.prisma.queja.update({

      where: { id },

      data: dto,

      include: {
        respuestas: true,
      },
    });
  }

  // ======================================
  // Eliminar queja
  // ======================================
  async remove(id: number) {

    const queja =
      await this.prisma.queja.findUnique({
        where: { id },
      });

    if (!queja) {
      throw new NotFoundException(
        'Queja no encontrada',
      );
    }

    return this.prisma.queja.delete({
      where: { id },
    });
  }

}