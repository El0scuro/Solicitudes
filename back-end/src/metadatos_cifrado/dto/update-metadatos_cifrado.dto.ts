import { PartialType } from '@nestjs/mapped-types';
import { CreateMetadatosCifradoDto } from './create-metadatos_cifrado.dto.js';

export class UpdateMetadatosCifradoDto extends PartialType(CreateMetadatosCifradoDto) {}
