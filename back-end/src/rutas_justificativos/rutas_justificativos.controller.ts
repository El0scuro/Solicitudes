import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RutasJustificativosService } from './rutas_justificativos.service.js';
import { CreateRutasJustificativoDto } from './dto/create-rutas_justificativo.dto.js';
import { UpdateRutasJustificativoDto } from './dto/update-rutas_justificativo.dto.js';

@Controller('rutas-justificativos')
export class RutasJustificativosController {
  constructor(private readonly rutasJustificativosService: RutasJustificativosService) {}

  @Post()
  create(@Body() createRutasJustificativoDto: CreateRutasJustificativoDto) {
    return this.rutasJustificativosService.create(createRutasJustificativoDto);
  }

  @Get()
  findAll() {
    return this.rutasJustificativosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rutasJustificativosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRutasJustificativoDto: UpdateRutasJustificativoDto) {
    return this.rutasJustificativosService.update(+id, updateRutasJustificativoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rutasJustificativosService.remove(+id);
  }
}
