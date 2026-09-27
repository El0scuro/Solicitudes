import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EstudianteService } from './estudiante.service.js';
import { EstudianteController } from './estudiante.controller.js';

import { Estudiante } from './entities/estudiante.entity.js';
import { MetadatosCifrado } from '../metadatos_cifrado/entities/metadatos_cifrado.entity.js';

import { AlmacenamientoModule } from '../almacenamiento/almacenamiento.module.js';
import { MetadatosCifradoModule } from '../metadatos_cifrado/metadatos_cifrado.module.js';
import { HibridoModule as HibridoBackModule } from '../hibrido_back/hibrido.module.js';
import { HibridoModule as HibridoFrontModule } from '../hibrido_front/hibrido.module.js';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Estudiante,
            MetadatosCifrado
        ], "solicitudes"),
        AlmacenamientoModule,
        MetadatosCifradoModule,
        HibridoBackModule,
        HibridoFrontModule
    ],

    controllers: [
        EstudianteController
    ],

    providers: [
        EstudianteService
    ],

    exports: [
        EstudianteService
    ]
})
export class EstudianteModule {}