import { PartialType } from '@nestjs/mapped-types';
import { CreateAlmacenamientoDto } from './create-almacenamiento.dto.js';

export class UpdateAlmacenamientoDto extends PartialType(CreateAlmacenamientoDto) {}
