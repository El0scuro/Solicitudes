import { Injectable } from '@nestjs/common';
import { CreateJustificacionDto } from './dto/create-justificacion.dto.js';
import { UpdateJustificacionDto } from './dto/update-justificacion.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Justificacion } from './entities/justificacion.entity.js';
import { Repository } from 'typeorm';

@Injectable()
export class JustificacionService {

  constructor(
    @InjectRepository(Justificacion, 'solicitudes')
    private justificacionRepository: Repository<Justificacion>
  ) {}

  create(createJustificacionDto: CreateJustificacionDto) {
    return 'This action adds a new justificacion';
  }

  findAll() {
    return `This action returns all justificacion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} justificacion`;
  }

  update(id: number, updateJustificacionDto: UpdateJustificacionDto) {
    return `This action updates a #${id} justificacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} justificacion`;
  }
}
