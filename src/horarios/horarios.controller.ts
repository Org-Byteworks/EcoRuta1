import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

import { HorariosService } from './horarios.service';

import { CreateHorarioDto } from './dto/create-horario.dto';

import { UpdateHorarioDto } from './dto/update-horario.dto';

@Controller('horarios')
export class HorariosController {

  constructor(
    private readonly horariosService: HorariosService,
  ) {}

  @Post()
  create(@Body() dto: CreateHorarioDto) {
    return this.horariosService.create(dto);
  }

  @Get()
  findAll() {
    return this.horariosService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateHorarioDto,
  ) {
    return this.horariosService.update(+id, dto);
  }

}