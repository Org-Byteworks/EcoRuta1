import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  // ======================================
  // ESTADÍSTICAS DASHBOARD ADMIN
  // ======================================
  async getStats() {

    // Total de rutas
    const rutas =
      await this.prisma.ruta.count();

    // Total de barrios
    const barrios =
      await this.prisma.barrio.count();

    // Total de vehículos
    const vehiculos =
      await this.prisma.vehiculo.count();

    // Total de quejas
    const quejas =
      await this.prisma.queja.count();

    // Quejas pendientes
    const pendientes =
      await this.prisma.queja.count({
        where: {
          estado: 'Pendiente',
        },
      });

    // Quejas resueltas
    const resueltas =
      await this.prisma.queja.count({
        where: {
          estado: 'Resuelta',
        },
      });

    // Quejas en proceso
    const enProceso =
      await this.prisma.queja.count({
        where: {
          estado: 'En proceso',
        },
      });

    // Respuesta final
    return {

      rutas,
      barrios,
      vehiculos,

      quejas,

      pendientes,
      resueltas,
      enProceso,

    };
  }
}