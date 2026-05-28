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

import { RutasService } from './rutas.service';

import { CreateRutaDto } from './dto/create-ruta.dto';
import { UpdateRutaDto } from './dto/update-ruta.dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('rutas')
export class RutasController {

  constructor(
    private readonly rutasService: RutasService,
  ) {}

  // ======================================
  // ADMIN: Crear ruta
  // ======================================
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body()
    dto: CreateRutaDto,
  ) {
    return this.rutasService.create(dto);
  }

  // ======================================
  // PÚBLICO: Ver rutas
  // ======================================
  @Get()
  findAll() {
    return this.rutasService.findAll();
  }

  // ======================================
  // ADMIN: Actualizar ruta
  // ======================================
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(

    @Param('id', ParseIntPipe)
    id: number,

    @Body()
    dto: UpdateRutaDto,
  ) {
    return this.rutasService.update(
      id,
      dto,
    );
  }

  // ======================================
  // ADMIN: Eliminar ruta
  // ======================================
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.rutasService.remove(id);
  }

}