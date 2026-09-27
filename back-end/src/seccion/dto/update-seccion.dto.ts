import { PartialType } from '@nestjs/mapped-types';
import { CreateSeccionDto } from './create-seccion.dto.js';

export class UpdateSeccionDto extends PartialType(CreateSeccionDto) {}
