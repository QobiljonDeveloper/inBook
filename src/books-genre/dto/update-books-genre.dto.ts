import { PartialType } from '@nestjs/swagger';
import { CreateBooksGenreDto } from './create-books-genre.dto';

export class UpdateBooksGenreDto extends PartialType(CreateBooksGenreDto) {}
