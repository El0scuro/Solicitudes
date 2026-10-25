import { Module } from '@nestjs/common';
import { AdministradorService } from './administrador.service.js';
import { AdministradorController } from './administrador.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Administrador } from './entities/administrador.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [Administrador],
      "administrador"
    )
  ],
  controllers: [AdministradorController],
  providers: [AdministradorService],
})
export class AdministradorModule {}
