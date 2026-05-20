import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class QuejasService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.queja.create({ data });
  }

  findAll() {
    return this.prisma.queja.findMany({
      include: {
        usuario: true,
        respuestas: true,
      },
    });
  }

  // ➕ Nuevo Método: Filtra las quejas pertenecientes a un único usuario particular
  findByUser(usuarioId: number) {
    return this.prisma.queja.findMany({
      where: { usuarioId },
      include: {
        usuario: true,
        respuestas: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.queja.findUnique({
      where: { id },
      include: {
        usuario: true,
        respuestas: true,
      },
    });
  }

  update(id: number, data: any) {
    return this.prisma.queja.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.queja.delete({
      where: { id },
    });
  }
}
