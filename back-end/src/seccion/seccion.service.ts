import { Injectable } from '@nestjs/common';
import { CreateSeccionDto } from './dto/create-seccion.dto.js';
import { UpdateSeccionDto } from './dto/update-seccion.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Seccion } from './entities/seccion.entity.js';
import { Repository } from 'typeorm';

@Injectable()
export class SeccionService {

  constructor(
    @InjectRepository(Seccion, 'solicitudes')
    private seccionRepository: Repository<Seccion>
  ) {}

  create(createSeccionDto: CreateSeccionDto) {
    return 'This action adds a new seccion';
  }

  findAll() {
    return `This action returns all seccion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} seccion`;
  }

  update(id: number, updateSeccionDto: UpdateSeccionDto) {
    return `This action updates a #${id} seccion`;
  }

  remove(id: number) {
    return `This action removes a #${id} seccion`;
  }
}
