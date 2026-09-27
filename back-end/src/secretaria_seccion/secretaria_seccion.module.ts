import { Module } from '@nestjs/common';
import { SecretariaSeccionService } from './secretaria_seccion.service.js';
import { SecretariaSeccionController } from './secretaria_seccion.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecretariaSeccion } from './entities/secretaria_seccion.entity.js';

@Module({
  imports: [
      TypeOrmModule.forFeature(
        [SecretariaSeccion],
        "solicitudes"
      )
    ],
  controllers: [SecretariaSeccionController],
  providers: [SecretariaSeccionService],
})
export class SecretariaSeccionModule {}
