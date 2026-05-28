import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { HorariosService } from './horarios.service';

import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('horarios')
export class HorariosController {

  constructor(
    private readonly horariosService: HorariosService,
  ) {}

  // ======================================
  // ADMIN: Crear horario
  // ======================================
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() dto: CreateHorarioDto,
  ) {
    return this.horariosService.create(dto);
  }

  // ======================================
  // PÚBLICO: Ver horarios
  // ======================================
  @Get()
  findAll() {
    return this.horariosService.findAll();
  }

  // ======================================
  // ADMIN: Actualizar horario
  // ======================================
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe)
    id: number,

    @Body()
    dto: UpdateHorarioDto,
  ) {
    return this.horariosService.update(
      id,
      dto,
    );
  }

}