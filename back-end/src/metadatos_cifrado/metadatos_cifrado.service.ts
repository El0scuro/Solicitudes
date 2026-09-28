import { Injectable } from '@nestjs/common';
import { CreateMetadatosCifradoDto } from './dto/create-metadatos_cifrado.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { MetadatosCifrado } from './entities/metadatos_cifrado.entity.js';
import { Repository } from 'typeorm';
import { createDecipheriv, randomBytes, createCipheriv} from 'node:crypto';
import { AlmacenamientoService } from '../almacenamiento/almacenamiento.service.js';

@Injectable()
export class MetadatosCifradoService {

  constructor(
    @InjectRepository(MetadatosCifrado, 'solicitudes')
    private metadatadosCifradoRepository: Repository<MetadatosCifrado>,

    private readonly almacenamientoService: AlmacenamientoService
  ) {}

  async create(createMetadatosCifradoDto: CreateMetadatosCifradoDto) {
    const nuevo = this.metadatadosCifradoRepository.create({
      Mail: createMetadatosCifradoDto.Mail,
      Version_Llave: createMetadatosCifradoDto.Version_Llave,
      Iv: createMetadatosCifradoDto.Iv,
      Atributo: createMetadatosCifradoDto.Atributo,
      AuthTag: createMetadatosCifradoDto.AuthTag
    });

    return await this.metadatadosCifradoRepository.save(nuevo);
  }

  findAll() {
    return `This action returns all metadatosCifrado`;
  }

  async findOne(mail: string) {
    const metadatos = await this.metadatadosCifradoRepository.find();

    for(const metadato of metadatos){
      const llave = await this.almacenamientoService.getKey(metadato.Version_Llave);
      
      const mailDescifrado = await this.almacenamientoService.descifrarDatoAlmacenamiento(
        metadato.Iv,
        metadato.AuthTag,
        metadato.Mail,
        llave
      );

      if(mail === mailDescifrado){
        return metadato;
      }
    }

    return 'Estudiante no registrado';
  }

  remove(id: number) {
    return `This action removes a #${id} metadatosCifrado`;
  }
}
