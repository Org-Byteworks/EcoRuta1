import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BarriosService } from './barrios.service';
import { CreateBarrioDto } from './dto/create-barrio.dto';
import { UpdateBarrioDto } from './dto/update-barrio.dto';

@Controller('barrios')
export class BarriosController {
  constructor(private readonly barriosService: BarriosService) {}

  // 🔒 OPERACIÓN ADMINISTRATIVA: Creación de nuevos sectores/barrios
  @Post()
  create(@Body() createBarrioDto: CreateBarrioDto) {
    return this.barriosService.create(createBarrioDto);
  }

  // 🔓 CONSULTA PÚBLICA: Permite ver los barrios y sus rutas asignadas sin iniciar sesión
  @Get()
  findAll() {
    return this.barriosService.findAll();
  }

  // 🔍 CONSULTA ESPECÍFICA: Obtener los detalles de un solo barrio mediante su ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.barriosService.findOne(+id);
  }

  // 🔒 OPERACIÓN ADMINISTRATIVA: Modificar los parámetros o el estado de un barrio
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBarrioDto: UpdateBarrioDto) {
    return this.barriosService.update(+id, updateBarrioDto);
  }

  // 🔒 OPERACIÓN ADMINISTRATIVA: Eliminar permanentemente un sector del sistema
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.barriosService.remove(+id);
  }
}
