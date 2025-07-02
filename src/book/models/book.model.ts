import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  Index,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Author } from "src/author/models/author.model"; 

interface IBookCreationAttr {
  publisher_year: Date;
  authorId: number;
}

@Table({ tableName: "books", timestamps: true })
export class Book extends Model<Book, IBookCreationAttr> {
  @ApiProperty({ example: 1, description: "Book ID" })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({
    example: "2023-01-01",
    description: "Nashr qilingan yil (sana formatida)",
  })
  @Column({ type: DataType.DATE, allowNull: false })
  publisher_year: Date;

  @ApiProperty({ example: 5, description: "Muallif ID si (foreign key)" })
  @ForeignKey(() => Author)
  @Column({ type: DataType.INTEGER, allowNull: false })
  authorId: number;

  @BelongsTo(() => Author)
  author: Author;
}
