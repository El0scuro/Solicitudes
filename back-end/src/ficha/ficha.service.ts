import { Injectable } from '@nestjs/common';
import { CreateFichaDto } from './dto/create-ficha.dto.js';
import { UpdateFichaDto } from './dto/update-ficha.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Ficha } from './entities/ficha.entity.js';
import { Repository } from 'typeorm';

@Injectable()
export class FichaService {

  constructor(
    @InjectRepository(Ficha, 'solicitudes')
    private fichaRepository: Repository<Ficha>
  ) {}
  
  create(createFichaDto: CreateFichaDto) {
    return 'This action adds a new ficha';
  }

  findAll() {
    return `This action returns all ficha`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ficha`;
  }

  update(id: number, updateFichaDto: UpdateFichaDto) {
    return `This action updates a #${id} ficha`;
  }

  remove(id: number) {
    return `This action removes a #${id} ficha`;
  }
}
