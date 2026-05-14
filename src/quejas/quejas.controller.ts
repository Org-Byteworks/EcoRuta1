import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuejasService } from './quejas.service';
import { CreateQuejaDto } from './dto/create-queja.dto';
import { UpdateQuejaDto } from './dto/update-queja.dto';

@Controller('quejas')
export class QuejasController {
  constructor(private readonly quejasService: QuejasService) {}

  @Post()
  create(@Body() createQuejaDto: CreateQuejaDto) {
    return this.quejasService.create(createQuejaDto);
  }

  @Get()
  findAll() {
    return this.quejasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quejasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuejaDto: UpdateQuejaDto) {
    return this.quejasService.update(+id, updateQuejaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quejasService.remove(+id);
  }
}
