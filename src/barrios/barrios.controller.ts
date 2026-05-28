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

import { BarriosService } from './barrios.service';

import { CreateBarrioDto } from './dto/create-barrio.dto';
import { UpdateBarrioDto } from './dto/update-barrio.dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('barrios')
export class BarriosController {
  constructor(
    private readonly barriosService: BarriosService,
  ) {}

  // ======================================
  // ADMIN: Crear barrio
  // ======================================
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createBarrioDto: CreateBarrioDto,
  ) {
    return this.barriosService.create(
      createBarrioDto,
    );
  }

  // ======================================
  // PÚBLICO: Ver todos los barrios
  // ======================================
  @Get()
  findAll() {
    return this.barriosService.findAll();
  }

  // ======================================
  // PÚBLICO: Ver barrio por ID
  // ======================================
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.barriosService.findOne(id);
  }

  // ======================================
  // ADMIN: Actualizar barrio
  // ======================================
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,

    @Body()
    updateBarrioDto: UpdateBarrioDto,
  ) {
    return this.barriosService.update(
      id,
      updateBarrioDto,
    );
  }

  // ======================================
  // ADMIN: Eliminar barrio
  // ======================================
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.barriosService.remove(id);
  }
}