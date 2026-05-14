import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBarrioDto } from './dto/create-barrio.dto';

@Injectable()
export class BarriosService {

  constructor(private prisma: PrismaService) {}

  async create(dto: CreateBarrioDto) {

    return this.prisma.barrio.create({
      data: dto,
    });

  }

  async findAll() {

    return this.prisma.barrio.findMany({
      include: {
        ruta: true,
      },
    });

  }

}