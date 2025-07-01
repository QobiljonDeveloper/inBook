import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";
import { GenreService } from "./genre.service";
import { CreateGenreDto } from "./dto/create-genre.dto";
import { UpdateGenreDto } from "./dto/update-genre.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Genre } from "./models/genre.model";

@ApiTags("Genres")
@Controller("genres")
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Post()
  @ApiOperation({ summary: "Yangi janr yaratish" })
  @ApiResponse({
    status: 201,
    description: "Janr muvaffaqiyatli yaratildi",
    type: Genre,
  })
  create(@Body() createGenreDto: CreateGenreDto) {
    return this.genreService.create(createGenreDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha janrlarni olish" })
  @ApiResponse({
    status: 200,
    description: "Janrlar ro‘yxati",
    type: [Genre],
  })
  findAll() {
    return this.genreService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "ID bo‘yicha janrni olish" })
  @ApiResponse({
    status: 200,
    description: "Topilgan janr",
    type: Genre,
  })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.genreService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "ID bo‘yicha janrni yangilash" })
  @ApiResponse({
    status: 200,
    description: "Janr muvaffaqiyatli yangilandi",
    type: Genre,
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateGenreDto: UpdateGenreDto
  ) {
    return this.genreService.update(id, updateGenreDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "ID bo‘yicha janrni o‘chirish" })
  @ApiResponse({
    status: 200,
    description: "Janr muvaffaqiyatli o‘chirildi",
  })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.genreService.remove(id);
  }
}
