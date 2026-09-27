import { Injectable } from '@nestjs/common';
import { CreateProfesorDto } from './dto/create-profesor.dto.js';
import { UpdateProfesorDto } from './dto/update-profesor.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Profesor } from './entities/profesor.entity.js';
import { Repository } from 'typeorm';

@Injectable()
export class ProfesorService {

  constructor(
    @InjectRepository(Profesor, 'solicitudes')
    private profesorRepository: Repository<Profesor>
  ) {}

  create(createProfesorDto: CreateProfesorDto) {
    return 'This action adds a new profesor';
  }

  findAll() {
    return `This action returns all profesor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} profesor`;
  }

  update(id: number, updateProfesorDto: UpdateProfesorDto) {
    return `This action updates a #${id} profesor`;
  }

  remove(id: number) {
    return `This action removes a #${id} profesor`;
  }
}
