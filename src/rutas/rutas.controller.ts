import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';

import { RutasService } from './rutas.service';

@Controller('rutas')
export class RutasController {
  constructor(
    private readonly rutasService: RutasService,
  ) {}

  @Post()
  create(@Body() data: any) {
    return this.rutasService.create(data);
  }

  @Get()
  findAll() {
    return this.rutasService.findAll();
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: any,
  ) {
    return this.rutasService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rutasService.remove(+id);
  }
}