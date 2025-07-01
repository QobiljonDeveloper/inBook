import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Genre } from "./models/genre.model";
import { CreateGenreDto } from "./dto/create-genre.dto";
import { UpdateGenreDto } from "./dto/update-genre.dto";

@Injectable()
export class GenreService {
  constructor(
    @InjectModel(Genre)
    private readonly genreModel: typeof Genre
  ) {}

  async create(createGenreDto: CreateGenreDto): Promise<Genre> {
    return await this.genreModel.create(createGenreDto);
  }

  async findAll(): Promise<Genre[]> {
    return await this.genreModel.findAll();
  }

  async findOne(id: number): Promise<Genre> {
    const genre = await this.genreModel.findByPk(id);
    if (!genre) {
      throw new NotFoundException("Janr topilmadi");
    }
    return genre;
  }

  async update(id: number, updateGenreDto: UpdateGenreDto): Promise<Genre> {
    const genre = await this.findOne(id);
    return await genre.update(updateGenreDto);
  }

  async remove(id: number): Promise<{ message: string }> {
    const genre = await this.findOne(id);
    await genre.destroy();
    return { message: "Janr muvaffaqiyatli o‘chirildi" };
  }
}
