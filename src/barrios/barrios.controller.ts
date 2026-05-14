import {
  Controller,
  Get,
  Post,
  Body,
} from '@nestjs/common';

import { BarriosService } from './barrios.service';
import { CreateBarrioDto } from './dto/create-barrio.dto';

@Controller('barrios')
export class BarriosController {

  constructor(
    private readonly barriosService: BarriosService,
  ) {}

  @Post()
  create(@Body() dto: CreateBarrioDto) {
    return this.barriosService.create(dto);
  }

  @Get()
  findAll() {
    return this.barriosService.findAll();
  }

}
