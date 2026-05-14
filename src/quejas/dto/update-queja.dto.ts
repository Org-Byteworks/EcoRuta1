import { PartialType } from '@nestjs/mapped-types';
import { CreateQuejaDto } from './create-queja.dto';

export class UpdateQuejaDto extends PartialType(CreateQuejaDto) {}
