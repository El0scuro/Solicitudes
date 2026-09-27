import { PartialType } from '@nestjs/mapped-types';
import { CreateSecretariaDto } from './create-secretaria.dto.js';

export class UpdateSecretariaDto extends PartialType(CreateSecretariaDto) {}
