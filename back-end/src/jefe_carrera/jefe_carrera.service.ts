import { Injectable } from '@nestjs/common';
import { CreateJefeCarreraDto } from './dto/create-jefe_carrera.dto.js';
import { UpdateJefeCarreraDto } from './dto/update-jefe_carrera.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Jefe_Carrera } from './entities/jefe_carrera.entity.js';
import { Repository } from 'typeorm';

@Injectable()
export class JefeCarreraService {

  constructor(
    @InjectRepository(Jefe_Carrera, 'solicitudes')
    private jefeCarreraRepository: Repository<Jefe_Carrera>
  ) {}

  create(createJefeCarreraDto: CreateJefeCarreraDto) {
    return 'This action adds a new jefeCarrera';
  }

  findAll() {
    return `This action returns all jefeCarrera`;
  }

  findOne(id: number) {
    return `This action returns a #${id} jefeCarrera`;
  }

  update(id: number, updateJefeCarreraDto: UpdateJefeCarreraDto) {
    return `This action updates a #${id} jefeCarrera`;
  }

  remove(id: number) {
    return `This action removes a #${id} jefeCarrera`;
  }
}
