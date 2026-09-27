import { PartialType } from '@nestjs/mapped-types';
import { CreateRutasJustificativoDto } from './create-rutas_justificativo.dto.js';

export class UpdateRutasJustificativoDto extends PartialType(CreateRutasJustificativoDto) {}
