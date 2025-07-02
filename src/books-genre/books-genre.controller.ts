import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BooksGenreService } from './books-genre.service';
import { CreateBooksGenreDto } from './dto/create-books-genre.dto';
import { UpdateBooksGenreDto } from './dto/update-books-genre.dto';

@Controller('books-genre')
export class BooksGenreController {
  constructor(private readonly booksGenreService: BooksGenreService) {}

  @Post()
  create(@Body() createBooksGenreDto: CreateBooksGenreDto) {
    return this.booksGenreService.create(createBooksGenreDto);
  }

  @Get()
  findAll() {
    return this.booksGenreService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksGenreService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBooksGenreDto: UpdateBooksGenreDto) {
    return this.booksGenreService.update(+id, updateBooksGenreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksGenreService.remove(+id);
  }
}
