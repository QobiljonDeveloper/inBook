import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { AudioBook } from "./models/audio_book.model";
import { CreateAudioBookDto } from "./dto/create-audio_book.dto";
import { UpdateAudioBookDto } from "./dto/update-audio_book.dto";

@Injectable()
export class AudioBookService {
  constructor(
    @InjectModel(AudioBook)
    private readonly audioBookRepo: typeof AudioBook
  ) {}

  async create(createAudioBookDto: CreateAudioBookDto): Promise<AudioBook> {
    const audioBook = await this.audioBookRepo.create(createAudioBookDto);
    return audioBook;
  }

  async findAll(): Promise<AudioBook[]> {
    return await this.audioBookRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<AudioBook> {
    const audioBook = await this.audioBookRepo.findByPk(id, {
      include: { all: true },
    });

    if (!audioBook) {
      throw new NotFoundException(`AudioBook ID ${id} topilmadi`);
    }

    return audioBook;
  }

  async update(
    id: number,
    updateAudioBookDto: UpdateAudioBookDto
  ): Promise<AudioBook> {
    const audioBook = await this.findOne(id);
    return await audioBook.update(updateAudioBookDto);
  }

  async remove(id: number): Promise<{ message: string }> {
    const audioBook = await this.findOne(id);
    await audioBook.destroy();
    return { message: `AudioBook ID ${id} muvaffaqiyatli o‘chirildi` };
  }
}
