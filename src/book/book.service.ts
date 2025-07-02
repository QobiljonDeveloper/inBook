import {
  Injectable,
  ConflictException,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Book } from "./models/book.model";
import { CreateBookDto } from "./dto/create-book.dto";

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book)
    private readonly bookRepo: typeof Book
  ) {}

  async create(dto: CreateBookDto): Promise<Book> {
    const existing = await this.bookRepo.findOne({
      where: {
        publisher_year: dto.publisher_year,
        authorId: dto.authorId,
      },
    });

    if (existing) {
      throw new ConflictException(
        "Ushbu muallif tomonidan shu yilda nashr qilingan kitob allaqachon mavjud"
      );
    }

    return await this.bookRepo.create(dto);
  }

  async findAll(): Promise<Book[]> {
    return await this.bookRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.bookRepo.findByPk(id, {
      include: { all: true },
    });

    if (!book) throw new NotFoundException(`Kitob ID ${id} topilmadi`);
    return book;
  }

  async remove(id: number): Promise<{ message: string }> {
    const book = await this.findOne(id);
    await book.destroy();
    return { message: `Kitob ID ${id} muvaffaqiyatli o‘chirildi` };
  }
}
