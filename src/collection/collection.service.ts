import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Collection } from "./models/collection.model";
import { CreateCollectionDto } from "./dto/create-collection.dto";
import { UpdateCollectionDto } from "./dto/update-collection.dto";

@Injectable()
export class CollectionService {
  constructor(
    @InjectModel(Collection) private collectionRepo: typeof Collection
  ) {}

  async create(createCollectionDto: CreateCollectionDto) {
    const existing = await this.collectionRepo.findOne({
      where: { title: createCollectionDto.title },
    });

    if (existing) {
      throw new BadRequestException(
        "Collection already exists with this title"
      );
    }

    return await this.collectionRepo.create(createCollectionDto);
  }

  async findAll() {
    return await this.collectionRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const collection = await this.collectionRepo.findByPk(id);
    if (!collection) throw new NotFoundException("Collection not found");
    return collection;
  }

  async update(id: number, updateCollectionDto: UpdateCollectionDto) {
    const collection = await this.findOne(id);
    return await collection.update(updateCollectionDto);
  }

  async remove(id: number) {
    const collection = await this.findOne(id);
    await collection.destroy();
    return { message: "Collection deleted" };
  }
}
