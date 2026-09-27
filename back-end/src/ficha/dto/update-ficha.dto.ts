import { PartialType } from '@nestjs/mapped-types';
import { CreateFichaDto } from './create-ficha.dto.js';

export class UpdateFichaDto extends PartialType(CreateFichaDto) {}
