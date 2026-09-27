import { PartialType } from '@nestjs/mapped-types';
import { CreateSolicitudDto } from './create-solicitud.dto.js';

export class UpdateSolicitudDto extends PartialType(CreateSolicitudDto) {}
