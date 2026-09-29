import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAsignaturaDto } from './dto/create-asignatura.dto.js';
import { UpdateAsignaturaDto } from './dto/update-asignatura.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Asignatura } from './entities/asignatura.entity.js';
import { Repository } from 'typeorm';
import { Seccion } from '../seccion/entities/seccion.entity.js';

@Injectable()
export class AsignaturaService {

  constructor(
    @InjectRepository(Asignatura, 'solicitudes')
    private asignaturaRepository: Repository<Asignatura>
  ){}
  
  create(createAsignaturaDto: CreateAsignaturaDto) {
    return 'This action adds a new asignatura';
  }

  findAll() {
    return `This action returns all asignatura`;
  }

  async findOneCodigo(Codigo: string) {

    const asignatura = await this.asignaturaRepository.findOne({
      where:{
        Codigo: Codigo
      },
      relations: {
        secciones: {
          profesor: true
        }
      },
    });

    if(!asignatura){
      throw new NotFoundException("Asignatura no existente");
    }

    return [asignatura];
  }

  async findOneNombre(Nombre: string) {

    const asignatura = await this.asignaturaRepository.findOne({
      where:{
        Nombre: Nombre
      },
      relations: {
        secciones: {
          profesor: true
        }
      },
    });

    if(!asignatura){
      throw new NotFoundException("Asignatura no existente");
    }

    return [asignatura];
  }

  async findSemestre(Semestre: string) {

    const asignaturas = await this.asignaturaRepository.find({
      where:{
        Semestre: Semestre
      },
      relations: {
        secciones: {
          profesor: true
        }
      },
    });

    if(asignaturas.length === 0){
      throw new NotFoundException("Semestre no existente");
    }

    return asignaturas;
  }

  update(id: number, updateAsignaturaDto: UpdateAsignaturaDto) {
    return `This action updates a #${id} asignatura`;
  }

  remove(id: number) {
    return `This action removes a #${id} asignatura`;
  }
}
