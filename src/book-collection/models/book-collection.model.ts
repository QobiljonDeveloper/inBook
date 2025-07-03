import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Book } from "src/book/models/book.model";
import { Collection } from "src/collection/models/collection.model";

export interface IBookCollectionCreationAttr {
  collectionId: number;
  bookId: number;
}

@Table({ tableName: "book_collections", timestamps: false })
export class BookCollection extends Model<
  BookCollection,
  IBookCollectionCreationAttr
> {
  @ApiProperty({ example: 1, description: "Collection ID" })
  @ForeignKey(() => Collection)
  @Column({ type: DataType.INTEGER, allowNull: false })
  collectionId: number;

  @ApiProperty({ example: 10, description: "Book ID" })
  @ForeignKey(() => Book)
  @Column({ type: DataType.INTEGER, allowNull: false })
  bookId: number;

  
}
