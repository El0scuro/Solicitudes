import { Module } from '@nestjs/common';
import { CambioSeccionService } from './cambio_seccion.service.js';
import { CambioSeccionController } from './cambio_seccion.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CambioSeccion } from './entities/cambio_seccion.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [CambioSeccion],
      "solicitudes"
    )
  ],
  controllers: [CambioSeccionController],
  providers: [CambioSeccionService],
})
export class CambioSeccionModule {}
