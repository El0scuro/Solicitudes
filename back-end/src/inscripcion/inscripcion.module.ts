import { Module } from '@nestjs/common';
import { InscripcionService } from './inscripcion.service.js';
import { InscripcionController } from './inscripcion.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inscripcion } from './entities/inscripcion.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [Inscripcion],
      "solicitudes"
    )
  ],
  controllers: [InscripcionController],
  providers: [InscripcionService],
})
export class InscripcionModule {}
