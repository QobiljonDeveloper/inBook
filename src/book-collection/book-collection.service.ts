import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { BookCollection } from "./models/book-collection.model";
import { CreateBookCollectionDto } from "./dto/create-book-collection.dto";
import { UpdateBookCollectionDto } from "./dto/update-book-collection.dto";

@Injectable()
export class BookCollectionService {
  constructor(
    @InjectModel(BookCollection)
    private readonly bookCollectionRepo: typeof BookCollection
  ) {}

  async create(createDto: CreateBookCollectionDto) {
    const bookCollection = await this.bookCollectionRepo.create(createDto);
    return {
      message: "BookCollection relation created successfully",
      data: bookCollection,
    };
  }

  async findAll() {
    const list = await this.bookCollectionRepo.findAll();
    return {
      message: "List of all book-collection relations",
      data: list,
    };
  }

  async findOne(id: number) {
    const bookCollection = await this.bookCollectionRepo.findByPk(id);
    if (!bookCollection) {
      throw new NotFoundException(`BookCollection with id ${id} not found`);
    }
    return {
      message: "Single book-collection relation found",
      data: bookCollection,
    };
  }

  async update(id: number, updateDto: UpdateBookCollectionDto) {
    const bookCollection = await this.bookCollectionRepo.findByPk(id);
    if (!bookCollection) {
      throw new NotFoundException(`BookCollection with id ${id} not found`);
    }

    await bookCollection.update(updateDto);
    return {
      message: "BookCollection relation updated successfully",
      data: bookCollection,
    };
  }

  async remove(id: number) {
    const bookCollection = await this.bookCollectionRepo.findByPk(id);
    if (!bookCollection) {
      throw new NotFoundException(`BookCollection with id ${id} not found`);
    }

    await bookCollection.destroy();
    return {
      message: "BookCollection relation deleted successfully",
    };
  }
}
