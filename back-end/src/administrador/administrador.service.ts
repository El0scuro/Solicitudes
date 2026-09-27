import { Injectable } from '@nestjs/common';
import { CreateAdministradorDto } from './dto/create-administrador.dto.js';
import { UpdateAdministradorDto } from './dto/update-administrador.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Administrador } from './entities/administrador.entity.js';
import { Repository } from 'typeorm';

@Injectable()
export class AdministradorService {

  constructor(
    @InjectRepository(Administrador, 'solicitudes')
    private administradorRepository: Repository<Administrador>
  ) {}
  
  create(createAdministradorDto: CreateAdministradorDto) {
    return 'This action adds a new administrador';
  }

  findAll() {
    return `This action returns all administrador`;
  }

  findOne(id: number) {
    return `This action returns a #${id} administrador`;
  }

  update(id: number, updateAdministradorDto: UpdateAdministradorDto) {
    return `This action updates a #${id} administrador`;
  }

  remove(id: number) {
    return `This action removes a #${id} administrador`;
  }
}
