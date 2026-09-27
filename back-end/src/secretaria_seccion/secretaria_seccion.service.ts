import { Injectable } from '@nestjs/common';
import { CreateSecretariaSeccionDto } from './dto/create-secretaria_seccion.dto.js';
import { UpdateSecretariaSeccionDto } from './dto/update-secretaria_seccion.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { SecretariaSeccion } from './entities/secretaria_seccion.entity.js';
import { Repository } from 'typeorm';

@Injectable()
export class SecretariaSeccionService {

  constructor(
    @InjectRepository(SecretariaSeccion, 'solicitudes')
    private secretariaSeccionRepository: Repository<SecretariaSeccion>
  ) {}

  create(createSecretariaSeccionDto: CreateSecretariaSeccionDto) {
    return 'This action adds a new secretariaSeccion';
  }

  findAll() {
    return `This action returns all secretariaSeccion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} secretariaSeccion`;
  }

  update(id: number, updateSecretariaSeccionDto: UpdateSecretariaSeccionDto) {
    return `This action updates a #${id} secretariaSeccion`;
  }

  remove(id: number) {
    return `This action removes a #${id} secretariaSeccion`;
  }
}
