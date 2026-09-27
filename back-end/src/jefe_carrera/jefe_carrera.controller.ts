import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JefeCarreraService } from './jefe_carrera.service.js';
import { CreateJefeCarreraDto } from './dto/create-jefe_carrera.dto.js';
import { UpdateJefeCarreraDto } from './dto/update-jefe_carrera.dto.js';

@Controller('jefe-carrera')
export class JefeCarreraController {
  constructor(private readonly jefeCarreraService: JefeCarreraService) {}

  @Post()
  create(@Body() createJefeCarreraDto: CreateJefeCarreraDto) {
    return this.jefeCarreraService.create(createJefeCarreraDto);
  }

  @Get()
  findAll() {
    return this.jefeCarreraService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jefeCarreraService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJefeCarreraDto: UpdateJefeCarreraDto) {
    return this.jefeCarreraService.update(+id, updateJefeCarreraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jefeCarreraService.remove(+id);
  }
}
