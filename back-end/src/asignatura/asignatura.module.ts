import { Module } from '@nestjs/common';
import { AsignaturaService } from './asignatura.service.js';
import { AsignaturaController } from './asignatura.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asignatura } from './entities/asignatura.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [Asignatura],
      "solicitudes"
    )
  ],
  controllers: [AsignaturaController],
  providers: [AsignaturaService],
})
export class AsignaturaModule {}
