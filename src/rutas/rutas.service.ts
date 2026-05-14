import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RutasService {
  constructor(private prisma: PrismaService) { }

  create(data: any) {
    return this.prisma.ruta.create({ data });
  }

  findAll() {
    return this.prisma.ruta.findMany({
      include: { horarios: true, barrios: true },
    });
  }
  async update(id: number, data: any) {
  return this.prisma.ruta.update({
    where: { id },
    data,
  });
}
  async remove(id: number) {
    // Verificar si existe
    const ruta = await this.prisma.ruta.findUnique({
      where: { id },
    });

    if (!ruta) {
      throw new NotFoundException('Ruta no encontrada');
    }

    // Eliminar horarios relacionados
    await this.prisma.horario.deleteMany({
      where: { rutaId: id },
    });

    // Eliminar barrios relacionados
    await this.prisma.barrio.deleteMany({
      where: { rutaId: id },
    });

    // Eliminar la ruta
    return this.prisma.ruta.delete({
      where: { id },
    });
  }
}