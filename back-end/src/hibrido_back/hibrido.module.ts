import { Module } from '@nestjs/common';
import { HibridoService } from './hibrido.service.js';
import { HibridoController } from './hibrido.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Key } from './entities/hibrido.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [Key],
      "transporte_back"
    )
  ],
  providers: [HibridoService],
  controllers: [HibridoController],
  exports: [
    HibridoService
  ]
})
export class HibridoModule {}
