import { Module } from '@nestjs/common';
import { ProfesorService } from './profesor.service.js';
import { ProfesorController } from './profesor.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profesor } from './entities/profesor.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [Profesor],
      "solicitudes"
    )
  ],
  controllers: [ProfesorController],
  providers: [ProfesorService],
})
export class ProfesorModule {}
