import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Author } from "./models/author.model";
import { CreateAuthorDto } from "./dto/create-author.dto";
import { UpdateAuthorDto } from "./dto/update-author.dto";

@Injectable()
export class AuthorsService {
  constructor(
    @InjectModel(Author)
    private authorModel: typeof Author
  ) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    return await this.authorModel.create(createAuthorDto);
  }

  async findAll(): Promise<Author[]> {
    return await this.authorModel.findAll();
  }

  async findOne(id: number): Promise<Author> {
    const author = await this.authorModel.findByPk(id);
    if (!author) {
      throw new NotFoundException(`Muallif topilmadi: ID ${id}`);
    }
    return author;
  }
  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    const [updatedCount, [updated]] = await this.authorModel.update(
      updateAuthorDto,
      {
        where: { id },
        returning: true,
      }
    );

    if (updatedCount === 0) {
      throw new NotFoundException(`User ID ${id} topilmadi`);
    }

    return updated;
  }
  async remove(id: number): Promise<{ message: string }> {
    const author = await this.findOne(id);
    await author.destroy();
    return { message: `Muallif o‘chirildi: ID ${id}` };
  }
}
