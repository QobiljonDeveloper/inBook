import { PartialType } from '@nestjs/swagger';
import { CreateBookVersionDto } from './create-book_version.dto';

export class UpdateBookVersionDto extends PartialType(CreateBookVersionDto) {}
