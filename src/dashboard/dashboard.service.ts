import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {

  constructor(private prisma: PrismaService) {}

  async getStats() {

    const usuarios =
      await this.prisma.usuario.count();

    const rutas =
      await this.prisma.ruta.count();

    const quejas =
      await this.prisma.queja.count();

    const pendientes =
      await this.prisma.queja.count({
        where: {
          estado: 'Pendiente',
        },
      });

    return {
      usuarios,
      rutas,
      quejas,
      pendientes,
    };

  }

}