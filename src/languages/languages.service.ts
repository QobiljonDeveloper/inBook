import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Language } from "./models/language.model";
import { CreateLanguageDto } from "./dto/create-language.dto";
import { UpdateLanguageDto } from "./dto/update-language.dto";

@Injectable()
export class LanguagesService {
  constructor(
    @InjectModel(Language)
    private readonly languageModel: typeof Language
  ) {}

  async create(createLanguageDto: CreateLanguageDto): Promise<Language> {
    return await this.languageModel.create(createLanguageDto);
  }

  async findAll(): Promise<Language[]> {
    return await this.languageModel.findAll();
  }

  async findOne(id: number): Promise<Language> {
    const language = await this.languageModel.findByPk(id);
    if (!language) {
      throw new NotFoundException(`Til topilmadi: ID ${id}`);
    }
    return language;
  }

  async update(
    id: number,
    updateLanguageDto: UpdateLanguageDto
  ): Promise<Language> {
    const language = await this.findOne(id);
    return await language.update(updateLanguageDto);
  }

  async remove(id: number): Promise<{ message: string }> {
    const language = await this.findOne(id);
    await language.destroy();
    return { message: `Til muvaffaqiyatli o‘chirildi (ID: ${id})` };
  }
}
