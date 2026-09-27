import { Injectable } from '@nestjs/common';
import { CreateRutasJustificativoDto } from './dto/create-rutas_justificativo.dto.js';
import { UpdateRutasJustificativoDto } from './dto/update-rutas_justificativo.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { RutasJustificativos } from './entities/rutas_justificativo.entity.js';
import { Repository } from 'typeorm';

@Injectable()
export class RutasJustificativosService {

  constructor(
    @InjectRepository(RutasJustificativos, 'solicitudes')
    private rutasJustificativosRepository: Repository<RutasJustificativos>
  ) {}

  create(createRutasJustificativoDto: CreateRutasJustificativoDto) {
    return 'This action adds a new rutasJustificativo';
  }

  findAll() {
    return `This action returns all rutasJustificativos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rutasJustificativo`;
  }

  update(id: number, updateRutasJustificativoDto: UpdateRutasJustificativoDto) {
    return `This action updates a #${id} rutasJustificativo`;
  }

  remove(id: number) {
    return `This action removes a #${id} rutasJustificativo`;
  }
}
