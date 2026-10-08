import { Injectable } from '@nestjs/common';
import { CreateFichaDto } from './dto/create-ficha.dto.js';
import { UpdateFichaDto } from './dto/update-ficha.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Ficha } from './entities/ficha.entity.js';
import { Repository } from 'typeorm';
import { SolicitudService } from '../solicitud/solicitud.service.js';

@Injectable()
export class FichaService {

  constructor(
    @InjectRepository(Ficha, 'solicitudes')
    private fichaRepository: Repository<Ficha>,

    private readonly solicitudService: SolicitudService,


  ) {}
  
  async create(createFichaDto: CreateFichaDto) {

    //Creo la noción de la ficha
    const ficha = await this.fichaRepository.create(createFichaDto);

    await this.fichaRepository.save(ficha);

    
    


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
