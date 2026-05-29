import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { QuejasService } from './quejas.service';

import { CreateQuejaDto } from './dto/create-queja.dto';
import { UpdateQuejaDto } from './dto/update-queja.dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('quejas')
export class QuejasController {

  constructor(
    private readonly quejasService: QuejasService,
  ) {}

  // ======================================
  // PÚBLICO: Crear queja/reclamo
  // ======================================
  @Post()
  create(
    @Body()
    createQuejaDto: CreateQuejaDto,
  ) {
    return this.quejasService.create(
      createQuejaDto,
    );
  }

  // ======================================
  // ADMIN: Ver todas las quejas
  // ======================================
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.quejasService.findAll();
  }

  // ======================================
// PÚBLICO: Seguimiento por código
// ======================================
@Get('seguimiento/:codigo')
seguimiento(
  @Param('codigo')
  codigo: string,
) {
  return this.quejasService.seguimiento(codigo);
}

  // ======================================
  // ADMIN: Ver una queja
  // ======================================
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.quejasService.findOne(id);
  }

  // ======================================
  // ADMIN: Actualizar queja
  // ======================================
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe)
    id: number,

    @Body()
    updateQuejaDto: UpdateQuejaDto,
  ) {
    return this.quejasService.update(
      id,
      updateQuejaDto,
    );
  }

  // ======================================
  // ADMIN: Eliminar queja
  // ======================================
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.quejasService.remove(id);
  }

}