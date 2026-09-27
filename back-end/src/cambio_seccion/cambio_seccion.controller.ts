import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CambioSeccionService } from './cambio_seccion.service.js';
import { CreateCambioSeccionDto } from './dto/create-cambio_seccion.dto.js';
import { UpdateCambioSeccionDto } from './dto/update-cambio_seccion.dto.js';

@Controller('cambio-seccion')
export class CambioSeccionController {
  constructor(private readonly cambioSeccionService: CambioSeccionService) {}

  @Post()
  create(@Body() createCambioSeccionDto: CreateCambioSeccionDto) {
    return this.cambioSeccionService.create(createCambioSeccionDto);
  }

  @Get()
  findAll() {
    return this.cambioSeccionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cambioSeccionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCambioSeccionDto: UpdateCambioSeccionDto) {
    return this.cambioSeccionService.update(+id, updateCambioSeccionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cambioSeccionService.remove(+id);
  }
}
