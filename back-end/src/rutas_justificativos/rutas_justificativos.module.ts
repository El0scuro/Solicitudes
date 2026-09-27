import { Module } from '@nestjs/common';
import { RutasJustificativosService } from './rutas_justificativos.service.js';
import { RutasJustificativosController } from './rutas_justificativos.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RutasJustificativos } from './entities/rutas_justificativo.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [RutasJustificativos],
      "solicitudes"
    )
  ],
  controllers: [RutasJustificativosController],
  providers: [RutasJustificativosService],
})
export class RutasJustificativosModule {}
