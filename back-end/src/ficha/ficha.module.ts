import { Module } from '@nestjs/common';
import { FichaService } from './ficha.service.js';
import { FichaController } from './ficha.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ficha } from './entities/ficha.entity.js';
import { SolicitudModule } from '../solicitud/solicitud.module.js';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [Ficha],
      "solicitudes"
    ),
    SolicitudModule
  ],
  controllers: [FichaController],
  providers: [FichaService],
})
export class FichaModule {}
