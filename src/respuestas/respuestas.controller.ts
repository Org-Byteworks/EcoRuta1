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

import { RespuestasService } from './respuestas.service';

import { CreateRespuestaDto } from './dto/create-respuesta.dto';
import { UpdateRespuestaDto } from './dto/update-respuesta.dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('respuestas')
export class RespuestasController {

  constructor(
    private readonly respuestasService: RespuestasService,
  ) {}

  // ======================================
  // ADMIN: Crear respuesta
  // ======================================
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body()
    createRespuestaDto: CreateRespuestaDto,
  ) {
    return this.respuestasService.create(
      createRespuestaDto,
    );
  }

  // ======================================
  // ADMIN: Ver respuestas
  // ======================================
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.respuestasService.findAll();
  }

  // ======================================
  // ADMIN: Ver una respuesta
  // ======================================
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.respuestasService.findOne(id);
  }

  // ======================================
  // ADMIN: Actualizar respuesta
  // ======================================
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe)
    id: number,

    @Body()
    updateRespuestaDto: UpdateRespuestaDto,
  ) {
    return this.respuestasService.update(
      id,
      updateRespuestaDto,
    );
  }

  // ======================================
  // ADMIN: Eliminar respuesta
  // ======================================
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.respuestasService.remove(id);
  }

}