import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { BookMark } from "./models/book-mark.model";
import { CreateBookMarkDto } from "./dto/create-book-mark.dto";
import { UpdateBookMarkDto } from "./dto/update-book-mark.dto";

@Injectable()
export class BookMarksService {
  constructor(
    @InjectModel(BookMark)
    private readonly bookMarkModel: typeof BookMark
  ) {}

  async create(createBookMarkDto: CreateBookMarkDto) {
    return this.bookMarkModel.create(createBookMarkDto);
  }

  async findAll() {
    return this.bookMarkModel.findAll();
  }

  async findOne(id: number) {
    return this.bookMarkModel.findByPk(id);
  }

  async update(id: number, updateBookMarkDto: UpdateBookMarkDto) {
    const bookMark = await this.bookMarkModel.findByPk(id);
    if (!bookMark) return null;
    return bookMark.update(updateBookMarkDto);
  }

  async remove(id: number) {
    const bookMark = await this.bookMarkModel.findByPk(id);
    if (!bookMark) return null;
    await bookMark.destroy();
    return { message: "Bookmark deleted successfully" };
  }
}
