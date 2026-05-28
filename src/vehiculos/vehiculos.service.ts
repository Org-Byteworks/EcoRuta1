import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
import { UpdateVehiculoDto } from './dto/update-vehiculo.dto';

@Injectable()
export class VehiculosService {

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  // ======================================
  // Crear vehículo
  // ======================================
  async create(
    dto: CreateVehiculoDto,
  ) {

    // Verificar si ya existe la placa
    const existe =
      await this.prisma.vehiculo.findUnique({
        where: {
          placa: dto.placa,
        },
      });

    if (existe) {
      throw new BadRequestException(
        'La placa ya está registrada',
      );
    }

    // Si viene rutaId verificar ruta
    if (dto.rutaId) {

      const ruta =
        await this.prisma.ruta.findUnique({
          where: {
            id: dto.rutaId,
          },
        });

      if (!ruta) {
        throw new BadRequestException(
          'La ruta no existe',
        );
      }
    }

    return this.prisma.vehiculo.create({

      data: dto,

      include: {
        ruta: true,
      },
    });
  }

  // ======================================
  // Obtener vehículos
  // ======================================
  findAll() {

    return this.prisma.vehiculo.findMany({

      include: {
        ruta: true,
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // ======================================
  // Obtener un vehículo
  // ======================================
  async findOne(id: number) {

    const vehiculo =
      await this.prisma.vehiculo.findUnique({

        where: { id },

        include: {
          ruta: true,
        },
      });

    if (!vehiculo) {
      throw new NotFoundException(
        'Vehículo no encontrado',
      );
    }

    return vehiculo;
  }

  // ======================================
  // Actualizar vehículo
  // ======================================
  async update(
    id: number,
    dto: UpdateVehiculoDto,
  ) {

    // Verificar existencia
    const vehiculo =
      await this.prisma.vehiculo.findUnique({
        where: { id },
      });

    if (!vehiculo) {
      throw new NotFoundException(
        'Vehículo no encontrado',
      );
    }

    // Verificar ruta si viene
    if (dto.rutaId) {

      const ruta =
        await this.prisma.ruta.findUnique({
          where: {
            id: dto.rutaId,
          },
        });

      if (!ruta) {
        throw new BadRequestException(
          'La ruta no existe',
        );
      }
    }

    return this.prisma.vehiculo.update({

      where: { id },

      data: dto,

      include: {
        ruta: true,
      },
    });
  }

  // ======================================
  // Eliminar vehículo
  // ======================================
  async remove(id: number) {

    const vehiculo =
      await this.prisma.vehiculo.findUnique({
        where: { id },
      });

    if (!vehiculo) {
      throw new NotFoundException(
        'Vehículo no encontrado',
      );
    }

    return this.prisma.vehiculo.delete({
      where: { id },
    });
  }

}