import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateBarrioDto } from './dto/create-barrio.dto';
import { UpdateBarrioDto } from './dto/update-barrio.dto';

@Injectable()
export class BarriosService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  // ======================================
  // Crear barrio
  // ======================================
  async create(
    createBarrioDto: CreateBarrioDto,
  ) {

    // Verificar si la ruta existe
    const rutaExists =
      await this.prisma.ruta.findUnique({
        where: {
          id: createBarrioDto.rutaId,
        },
      });

    if (!rutaExists) {
      throw new NotFoundException(
        'La ruta no existe',
      );
    }

    // Crear barrio
    return this.prisma.barrio.create({
      data: {
        nombre: createBarrioDto.nombre,

        ruta: {
          connect: {
            id: createBarrioDto.rutaId,
          },
        },
      },

      include: {
        ruta: true,
      },
    });
  }

  // ======================================
  // Obtener todos los barrios
  // ======================================
  findAll() {
    return this.prisma.barrio.findMany({
      include: {
        ruta: true,
      },
    });
  }

  // ======================================
  // Obtener barrio por ID
  // ======================================
  findOne(id: number) {
    return this.prisma.barrio.findUnique({
      where: { id },

      include: {
        ruta: true,
      },
    });
  }

  // ======================================
  // Actualizar barrio
  // ======================================
  update(
    id: number,
    updateBarrioDto: UpdateBarrioDto,
  ) {
    return this.prisma.barrio.update({
      where: { id },

      data: {
        nombre: updateBarrioDto.nombre,

        ...(updateBarrioDto.rutaId && {
          ruta: {
            connect: {
              id: updateBarrioDto.rutaId,
            },
          },
        }),
      },

      include: {
        ruta: true,
      },
    });
  }

  // ======================================
  // Eliminar barrio
  // ======================================
  remove(id: number) {
    return this.prisma.barrio.delete({
      where: { id },
    });
  }
}
