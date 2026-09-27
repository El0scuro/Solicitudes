import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SecretariaSeccionService } from './secretaria_seccion.service.js';
import { CreateSecretariaSeccionDto } from './dto/create-secretaria_seccion.dto.js';
import { UpdateSecretariaSeccionDto } from './dto/update-secretaria_seccion.dto.js';

@Controller('secretaria-seccion')
export class SecretariaSeccionController {
  constructor(private readonly secretariaSeccionService: SecretariaSeccionService) {}

  @Post()
  create(@Body() createSecretariaSeccionDto: CreateSecretariaSeccionDto) {
    return this.secretariaSeccionService.create(createSecretariaSeccionDto);
  }

  @Get()
  findAll() {
    return this.secretariaSeccionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.secretariaSeccionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSecretariaSeccionDto: UpdateSecretariaSeccionDto) {
    return this.secretariaSeccionService.update(+id, updateSecretariaSeccionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.secretariaSeccionService.remove(+id);
  }
}
