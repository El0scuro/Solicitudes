import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JustificacionService } from './justificacion.service.js';
import { CreateJustificacionDto } from './dto/create-justificacion.dto.js';
import { UpdateJustificacionDto } from './dto/update-justificacion.dto.js';

@Controller('justificacion')
export class JustificacionController {
  constructor(private readonly justificacionService: JustificacionService) {}

  @Post()
  create(@Body() createJustificacionDto: CreateJustificacionDto) {
    return this.justificacionService.create(createJustificacionDto);
  }

  @Get()
  findAll() {
    return this.justificacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.justificacionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJustificacionDto: UpdateJustificacionDto) {
    return this.justificacionService.update(+id, updateJustificacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.justificacionService.remove(+id);
  }
}
