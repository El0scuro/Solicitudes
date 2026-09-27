import { PartialType } from '@nestjs/mapped-types';
import { CreateSecretariaSeccionDto } from './create-secretaria_seccion.dto.js';

export class UpdateSecretariaSeccionDto extends PartialType(CreateSecretariaSeccionDto) {}
