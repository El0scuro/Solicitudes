import { Module } from '@nestjs/common';
import { SeccionService } from './seccion.service.js';
import { SeccionController } from './seccion.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seccion } from './entities/seccion.entity.js';

@Module({
  imports: [
      TypeOrmModule.forFeature(
        [Seccion],
        "solicitudes"
      )
    ],
  controllers: [SeccionController],
  providers: [SeccionService],
})
export class SeccionModule {}
