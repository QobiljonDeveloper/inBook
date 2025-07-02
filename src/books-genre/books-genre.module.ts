import { Module } from '@nestjs/common';
import { BooksGenreService } from './books-genre.service';
import { BooksGenreController } from './books-genre.controller';

@Module({
  controllers: [BooksGenreController],
  providers: [BooksGenreService],
})
export class BooksGenreModule {}
