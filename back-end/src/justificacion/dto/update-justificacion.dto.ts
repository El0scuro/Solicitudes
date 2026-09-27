import { PartialType } from '@nestjs/mapped-types';
import { CreateJustificacionDto } from './create-justificacion.dto.js';

export class UpdateJustificacionDto extends PartialType(CreateJustificacionDto) {}
