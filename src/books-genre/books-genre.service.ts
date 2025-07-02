import { Injectable } from '@nestjs/common';
import { CreateBooksGenreDto } from './dto/create-books-genre.dto';
import { UpdateBooksGenreDto } from './dto/update-books-genre.dto';

@Injectable()
export class BooksGenreService {
  create(createBooksGenreDto: CreateBooksGenreDto) {
    return 'This action adds a new booksGenre';
  }

  findAll() {
    return `This action returns all booksGenre`;
  }

  findOne(id: number) {
    return `This action returns a #${id} booksGenre`;
  }

  update(id: number, updateBooksGenreDto: UpdateBooksGenreDto) {
    return `This action updates a #${id} booksGenre`;
  }

  remove(id: number) {
    return `This action removes a #${id} booksGenre`;
  }
}
