import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateRutaDto } from './dto/create-ruta.dto';
import { UpdateRutaDto } from './dto/update-ruta.dto';

@Injectable()
export class RutasService {

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  // ======================================
  // Crear ruta
  // ======================================
  create(dto: CreateRutaDto) {

    return this.prisma.ruta.create({

      data: dto,

      include: {
        horarios: true,
        barrios: true,
      },
    });
  }

  // ======================================
  // Obtener rutas
  // ======================================
  findAll() {

    return this.prisma.ruta.findMany({

      include: {
        horarios: true,
        barrios: true,
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // ======================================
  // Actualizar ruta
  // ======================================
  async update(
    id: number,
    dto: UpdateRutaDto,
  ) {

    // Verificar si existe
    const ruta =
      await this.prisma.ruta.findUnique({
        where: { id },
      });

    if (!ruta) {
      throw new NotFoundException(
        'Ruta no encontrada',
      );
    }

    return this.prisma.ruta.update({

      where: { id },

      data: dto,

      include: {
        horarios: true,
        barrios: true,
      },
    });
  }

  // ======================================
  // Eliminar ruta
  // ======================================
  async remove(id: number) {

    // Verificar existencia
    const ruta =
      await this.prisma.ruta.findUnique({
        where: { id },
      });

    if (!ruta) {
      throw new NotFoundException(
        'Ruta no encontrada',
      );
    }

    // Eliminar horarios
    await this.prisma.horario.deleteMany({
      where: {
        rutaId: id,
      },
    });

    // Eliminar barrios
    await this.prisma.barrio.deleteMany({
      where: {
        rutaId: id,
      },
    });

    // Eliminar ruta
    return this.prisma.ruta.delete({
      where: { id },
    });
  }

}