import { Injectable } from '@nestjs/common';
import { CreateSecretariaDto } from './dto/create-secretaria.dto.js';
import { UpdateSecretariaDto } from './dto/update-secretaria.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Secretaria } from './entities/secretaria.entity.js';
import { Repository } from 'typeorm';

@Injectable()
export class SecretariaService {

  constructor(
    @InjectRepository(Secretaria, 'solicitudes')
    private secretariaRepository: Repository<Secretaria>
  ) {}

  create(createSecretariaDto: CreateSecretariaDto) {
    return 'This action adds a new secretaria';
  }

  findAll() {
    return `This action returns all secretaria`;
  }

  findOne(id: number) {
    return `This action returns a #${id} secretaria`;
  }

  update(id: number, updateSecretariaDto: UpdateSecretariaDto) {
    return `This action updates a #${id} secretaria`;
  }

  remove(id: number) {
    return `This action removes a #${id} secretaria`;
  }
}
