import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RespuestasService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.respuesta.create({ data });
  }

  findAll() {
    return this.prisma.respuesta.findMany();
  }

  findOne(id: number) {
    return this.prisma.respuesta.findUnique({
      where: { id },
    });
  }

  update(id: number, data: any) {
    return this.prisma.respuesta.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.respuesta.delete({
      where: { id },
    });
  }
}