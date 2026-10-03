import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AsignaturaService } from './asignatura.service.js';
import { CreateAsignaturaDto } from './dto/create-asignatura.dto.js';
import { UpdateAsignaturaDto } from './dto/update-asignatura.dto.js';

@Controller('asignatura')
export class AsignaturaController {
  constructor(private readonly asignaturaService: AsignaturaService) {}

  @Post()
  create(@Body() createAsignaturaDto: CreateAsignaturaDto) {
    return this.asignaturaService.create(createAsignaturaDto);
  }

  @Get('buscar-todas')
  findAll() {
    return this.asignaturaService.findAll();
  }

  //Buscar asignatura por su código
  @Get('Buscar-codigo/:Codigo')
  findOneCodigo(@Param('Codigo') Codigo: string) {
    return this.asignaturaService.findOneCodigo(Codigo);
  }

  //Buscar asignatura por su nombre
  @Get('Buscar-nombre/:Nombre')
  findOneNombre(@Param('Nombre') Nombre: string) {
    return this.asignaturaService.findOneNombre(Nombre);
  }

  //Buscar asignaturas por su semestre
  @Get('Buscar-semestre/:Semestre')
  findOneSemestre(@Param('Semestre') Semestre: string) {
    return this.asignaturaService.findSemestre(Semestre);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAsignaturaDto: UpdateAsignaturaDto) {
    return this.asignaturaService.update(+id, updateAsignaturaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.asignaturaService.remove(+id);
  }
}
