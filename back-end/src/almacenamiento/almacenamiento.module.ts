import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AlmacenamientoService } from './almacenamiento.service.js';
import { Almacenamiento } from './entities/almacenamiento.entity.js';

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [Almacenamiento],
            'almacenamiento'
        )
    ],
    providers: [
        AlmacenamientoService
    ],
    exports: [
        AlmacenamientoService
    ]
})
export class AlmacenamientoModule {}