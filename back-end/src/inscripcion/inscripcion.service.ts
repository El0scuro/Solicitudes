import { Injectable } from '@nestjs/common';
import { CreateInscripcionDto } from './dto/create-inscripcion.dto.js';
import { UpdateInscripcionDto } from './dto/update-inscripcion.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Inscripcion } from './entities/inscripcion.entity.js';
import { Repository } from 'typeorm';

@Injectable()
export class InscripcionService {
  
  constructor(
    @InjectRepository(Inscripcion, 'solicitudes')
    private incripcionRepository: Repository<Inscripcion>
  ) {}

  create(createInscripcionDto: CreateInscripcionDto) {
    return 'This action adds a new inscripcion';
  }

  findAll() {
    return `This action returns all inscripcion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} inscripcion`;
  }

  update(id: number, updateInscripcionDto: UpdateInscripcionDto) {
    return `This action updates a #${id} inscripcion`;
  }

  remove(id: number) {
    return `This action removes a #${id} inscripcion`;
  }
}
