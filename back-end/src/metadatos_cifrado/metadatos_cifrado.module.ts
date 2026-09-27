import { Module } from '@nestjs/common';
import { MetadatosCifradoService } from './metadatos_cifrado.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetadatosCifrado } from './entities/metadatos_cifrado.entity.js';
import { AlmacenamientoModule } from '../almacenamiento/almacenamiento.module.js';

@Module({
  imports: [
      TypeOrmModule.forFeature(
          [MetadatosCifrado],
          'solicitudes'
      ),
      AlmacenamientoModule
  ],
  providers: [MetadatosCifradoService],
  exports: [
    MetadatosCifradoService
  ]
})
export class MetadatosCifradoModule {}
