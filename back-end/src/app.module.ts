import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { createObserveModule } from '@nestjs/observe';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';

import { EstudianteModule } from './estudiante/estudiante.module.js';
import { FichaModule } from './ficha/ficha.module.js';
import { SolicitudModule } from './solicitud/solicitud.module.js';
import { InscripcionModule } from './inscripcion/inscripcion.module.js';
import { JustificacionModule } from './justificacion/justificacion.module.js';
import { CambioSeccionModule } from './cambio_seccion/cambio_seccion.module.js';
import { RutasJustificativosModule } from './rutas_justificativos/rutas_justificativos.module.js';
import { SeccionModule } from './seccion/seccion.module.js';
import { SecretariaSeccionModule } from './secretaria_seccion/secretaria_seccion.module.js';
import { SecretariaModule } from './secretaria/secretaria.module.js';
import { AdministradorModule } from './administrador/administrador.module.js';
import { AsignaturaModule } from './asignatura/asignatura.module.js';
import { ProfesorModule } from './profesor/profesor.module.js';
import { JefeCarreraModule } from './jefe_carrera/jefe_carrera.module.js';
import { HibridoModule as HibridoBackModule } from './hibrido_back/hibrido.module.js';
import { HibridoModule as HibridoFrontModule } from './hibrido_front/hibrido.module.js';
import { MetadatosCifradoModule } from './metadatos_cifrado/metadatos_cifrado.module.js';
import { AlmacenamientoModule } from './almacenamiento/almacenamiento.module.js';

import { ScheduleModule } from '@nestjs/schedule';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [

    ScheduleModule.forRoot(),
    
    TypeOrmModule.forRoot({
      name: "solicitudes",
      type: 'mysql',
      host: process.env.SOLICITUD_DB_HOST,
      port: Number(process.env.SOLICITUD_DB_PORT),
      username: process.env.SOLICITUD_DB_USER,
      password: process.env.SOLICITUD_DB_PASSWORD,
      database: process.env.SOLICITUD_DB_NAME,

      autoLoadEntities: true,

      synchronize: false,
    }),
    TypeOrmModule.forRoot({
      name: "transporte_front",
      type: 'mysql',
      host: process.env.TRANSPORTE_FRONT_DB_HOST,
      port: Number(process.env.TRANSPORTE_FRONT_DB_PORT),
      username: process.env.TRANSPORTE_FRONT_DB_USER,
      password: process.env.TRANSPORTE_FRONT_DB_PASSWORD,
      database: process.env.TRANSPORTE_FRONT_DB_NAME,

      autoLoadEntities: true,

      synchronize: false,
    }),
    TypeOrmModule.forRoot({
      name: "transporte_back",
      type: 'mysql',
      host: process.env.TRANSPORTE_BACK_DB_HOST,
      port: Number(process.env.TRANSPORTE_BACK_DB_PORT),
      username: process.env.TRANSPORTE_BACK_DB_USER,
      password: process.env.TRANSPORTE_BACK_DB_PASSWORD,
      database: process.env.TRANSPORTE_BACK_DB_NAME,

      autoLoadEntities: true,

      synchronize: false,
    }),
    TypeOrmModule.forRoot({
      name: "almacenamiento",
      type: 'mysql',
      host: process.env.ALMACENAMIENTO_DB_HOST,
      port: Number(process.env.ALMACENAMIENTO_DB_PORT),
      username: process.env.ALMACENAMIENTO_DB_USER,
      password: process.env.ALMACENAMIENTO_DB_PASSWORD,
      database: process.env.ALMACENAMIENTO_DB_NAME,

      autoLoadEntities: true,

      synchronize: false,
    }),

    EstudianteModule,
    FichaModule,
    SolicitudModule,
    InscripcionModule,
    JustificacionModule,
    CambioSeccionModule,
    RutasJustificativosModule,
    SeccionModule,
    SecretariaModule,
    AdministradorModule,
    AsignaturaModule,
    ProfesorModule,
    JefeCarreraModule,
    HibridoBackModule,
    HibridoFrontModule,
    MetadatosCifradoModule,
    AlmacenamientoModule,
    SecretariaSeccionModule,
  ],

  controllers: [
    AppController
  ],

  providers: [
    AppService
  ],
})
export class AppModule {}