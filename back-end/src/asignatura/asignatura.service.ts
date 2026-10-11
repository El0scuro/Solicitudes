import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateAsignaturaDto } from './dto/update-asignatura.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Asignatura } from './entities/asignatura.entity.js';
import { Repository } from 'typeorm';

@Injectable()
export class AsignaturaService {

  constructor(
    @InjectRepository(Asignatura, 'solicitudes')
    private asignaturaRepository: Repository<Asignatura>
  ){}

  async findAll() {
    return await this.asignaturaRepository.find();
  }

  async findOneCodigo(Codigo: string) {

    const asignatura = await this.asignaturaRepository.findOne({
      where:{
        Codigo: Codigo
      }
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
      }
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
      }
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
