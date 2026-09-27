import { Module } from '@nestjs/common';
import { JustificacionService } from './justificacion.service.js';
import { JustificacionController } from './justificacion.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Justificacion } from './entities/justificacion.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [Justificacion],
      "solicitudes"
    )
  ],
  controllers: [JustificacionController],
  providers: [JustificacionService],
})
export class JustificacionModule {}
