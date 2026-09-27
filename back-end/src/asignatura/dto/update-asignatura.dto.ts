import { PartialType } from '@nestjs/mapped-types';
import { CreateAsignaturaDto } from './create-asignatura.dto.js';

export class UpdateAsignaturaDto extends PartialType(CreateAsignaturaDto) {}
