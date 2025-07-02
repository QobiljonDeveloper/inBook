import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { BookVersion } from "./models/book_version.model";
import { CreateBookVersionDto } from "./dto/create-book_version.dto";
import { UpdateBookVersionDto } from "./dto/update-book_version.dto";

@Injectable()
export class BookVersionService {
  constructor(
    @InjectModel(BookVersion)
    private readonly bookVersionRepo: typeof BookVersion
  ) {}

  async create(
    createBookVersionDto: CreateBookVersionDto
  ): Promise<BookVersion> {
    const { bookId, languageId } = createBookVersionDto;

    const existing = await this.bookVersionRepo.findOne({
      where: { bookId, languageId },
    });

    if (existing) {
      throw new ConflictException(
        `BookVersion (bookId: ${bookId}, languageId: ${languageId}) allaqachon mavjud`
      );
    }

    return await this.bookVersionRepo.create(createBookVersionDto);
  }

  async findAll(): Promise<BookVersion[]> {
    return await this.bookVersionRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<BookVersion> {
    const bookVersion = await this.bookVersionRepo.findByPk(id, {
      include: { all: true },
    });

    if (!bookVersion) {
      throw new NotFoundException(`BookVersion ID ${id} topilmadi`);
    }

    return bookVersion;
  }

  async update(
    id: number,
    updateBookVersionDto: UpdateBookVersionDto
  ): Promise<BookVersion> {
    const bookVersion = await this.findOne(id);
    return await bookVersion.update(updateBookVersionDto);
  }

  async remove(id: number): Promise<{ message: string }> {
    const bookVersion = await this.findOne(id);
    await bookVersion.destroy();
    return { message: `BookVersion ID ${id} muvaffaqiyatli o‘chirildi` };
  }
}
