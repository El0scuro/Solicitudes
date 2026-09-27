import { Module } from '@nestjs/common';
import { JefeCarreraService } from './jefe_carrera.service.js';
import { JefeCarreraController } from './jefe_carrera.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jefe_Carrera } from './entities/jefe_carrera.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [Jefe_Carrera],
      "solicitudes"
    )
  ],
  controllers: [JefeCarreraController],
  providers: [JefeCarreraService],
})
export class JefeCarreraModule {}
