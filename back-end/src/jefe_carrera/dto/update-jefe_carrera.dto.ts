import { PartialType } from '@nestjs/mapped-types';
import { CreateJefeCarreraDto } from './create-jefe_carrera.dto.js';

export class UpdateJefeCarreraDto extends PartialType(CreateJefeCarreraDto) {}
