import { Injectable } from '@nestjs/common';
import { CreateCambioSeccionDto } from './dto/create-cambio_seccion.dto.js';
import { UpdateCambioSeccionDto } from './dto/update-cambio_seccion.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { CambioSeccion } from './entities/cambio_seccion.entity.js';
import { Repository } from 'typeorm';

@Injectable()
export class CambioSeccionService {

  constructor(
    @InjectRepository(CambioSeccion, 'solicitudes')
    private cambioSeccionRepository: Repository<CambioSeccion>
  ) {}

  create(createCambioSeccionDto: CreateCambioSeccionDto) {
    return 'This action adds a new cambioSeccion';
  }

  findAll() {
    return `This action returns all cambioSeccion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cambioSeccion`;
  }

  update(id: number, updateCambioSeccionDto: UpdateCambioSeccionDto) {
    return `This action updates a #${id} cambioSeccion`;
  }

  remove(id: number) {
    return `This action removes a #${id} cambioSeccion`;
  }
}
