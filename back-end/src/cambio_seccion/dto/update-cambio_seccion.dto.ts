import { PartialType } from '@nestjs/mapped-types';
import { CreateCambioSeccionDto } from './create-cambio_seccion.dto.js';

export class UpdateCambioSeccionDto extends PartialType(CreateCambioSeccionDto) {}
