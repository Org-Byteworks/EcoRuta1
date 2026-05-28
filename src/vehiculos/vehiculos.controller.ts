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

import { VehiculosService } from './vehiculos.service';

import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
import { UpdateVehiculoDto } from './dto/update-vehiculo.dto';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('vehiculos')
export class VehiculosController {

  constructor(
    private readonly vehiculosService: VehiculosService,
  ) {}

  // ======================================
  // ADMIN: Crear vehículo
  // ======================================
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body()
    dto: CreateVehiculoDto,
  ) {
    return this.vehiculosService.create(dto);
  }

  // ======================================
  // PÚBLICO: Ver vehículos
  // ======================================
  @Get()
  findAll() {
    return this.vehiculosService.findAll();
  }

  // ======================================
  // PÚBLICO: Ver un vehículo
  // ======================================
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.vehiculosService.findOne(id);
  }

  // ======================================
  // ADMIN: Actualizar vehículo
  // ======================================
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(

    @Param('id', ParseIntPipe)
    id: number,

    @Body()
    dto: UpdateVehiculoDto,
  ) {
    return this.vehiculosService.update(
      id,
      dto,
    );
  }

  // ======================================
  // ADMIN: Eliminar vehículo
  // ======================================
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.vehiculosService.remove(id);
  }

}