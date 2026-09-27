import { Module } from '@nestjs/common';
import { SecretariaService } from './secretaria.service.js';
import { SecretariaController } from './secretaria.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Secretaria } from './entities/secretaria.entity.js';

@Module({
  imports: [
      TypeOrmModule.forFeature(
        [Secretaria],
        "solicitudes"
      )
    ],
  controllers: [SecretariaController],
  providers: [SecretariaService],
})
export class SecretariaModule {}
