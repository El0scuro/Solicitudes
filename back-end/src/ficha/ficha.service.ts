import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFichaDto } from './dto/create-ficha.dto.js';
import { UpdateFichaDto } from './dto/update-ficha.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Ficha } from './entities/ficha.entity.js';
import { Repository } from 'typeorm';
import { Estudiante } from '../estudiante/entities/estudiante.entity.js';
import { Inscripcion } from '../inscripcion/entities/inscripcion.entity.js';
import { Justificacion } from '../justificacion/entities/justificacion.entity.js';
import { CambioSeccion } from '../cambio_seccion/entities/cambio_seccion.entity.js';
import { Solicitud } from '../solicitud/entities/solicitud.entity.js';

@Injectable()
export class FichaService {

  constructor(
    @InjectRepository(Ficha, 'solicitudes')
    private fichaRepository: Repository<Ficha>,

    @InjectRepository(Estudiante, 'solicitudes')
    private estudianteRepository: Repository<Estudiante>,

    @InjectRepository(Inscripcion, 'solicitudes')
    private inscripcionesRepository: Repository<Inscripcion>,

    @InjectRepository(Justificacion, 'solicitudes')
    private justificacionesRepository: Repository<Justificacion>,

    @InjectRepository(CambioSeccion, 'solicitudes')
    private cambiosRepository: Repository<CambioSeccion>,

    @InjectRepository(Solicitud, 'solicitudes')
    private solicitudRepository: Repository<Solicitud>
  ) {}
  
  async create(createFichaDto: CreateFichaDto) {

    //Busco al estudiante que creó la ficha
    const estudiante = await this.estudianteRepository.findOne({
      where: {
        Mail: createFichaDto.Mail
      }
    });

    if(!estudiante){
      throw new NotFoundException("Estudiante no existente");
    }

    //Creo la noción de la ficha
    const ficha = this.fichaRepository.create({
      Fecha_Actual: createFichaDto.Fecha_Actual,
      Estado: createFichaDto.Estado,
      Sede: createFichaDto.Sede,
      estudiante: estudiante
    });

    await this.fichaRepository.save(ficha);

    if(createFichaDto.Inscripcion){
      for(const inscripcion of createFichaDto.Inscripciones){

        const nuevaSolicitud = this.solicitudRepository.create({
          asignatura: inscripcion.asignatura
        });

        await this.solicitudRepository.save(nuevaSolicitud);

        const nuevaInscripcion = this.inscripcionesRepository.create({
          Tipo_Inscripcion: inscripcion.Tipo_Inscripcion,
          Ruta_Carta: 'aaaaaaaaaa',
          ID_Solicitud: nuevaSolicitud.ID_Solicitud
        });
      }
    }

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
