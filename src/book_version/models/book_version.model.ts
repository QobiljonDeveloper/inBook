import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Book } from "src/book/models/book.model";
import { Language } from "src/languages/models/language.model";
import { AudioBook } from "../../audio_book/models/audio_book.model";

interface IBookVersionCreationAttr {
  bookId: number;
  languageId: number;
  title: string;
  description: string;
  text_url: string;
  cover_url: string;
}

@Table({ tableName: "book_versions", timestamps: true })
export class BookVersion extends Model<BookVersion, IBookVersionCreationAttr> {
  @ApiProperty({ example: 1, description: "BookVersion ID" })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ example: 5, description: "Book ID (foreign key)" })
  @ForeignKey(() => Book)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare bookId: number;

  @ApiProperty({ example: 2, description: "Language ID (foreign key)" })
  @ForeignKey(() => Language)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare languageId: number;

  @ApiProperty({
    example: "1984 (O‘zbek tilida)",
    description: "Kitob sarlavhasi (versiyasi)",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare title: string;

  @ApiProperty({
    example: "Bu kitob George Orwell tomonidan yozilgan...",
    description: "Kitob haqida tavsif",
  })
  @Column({ type: DataType.TEXT, allowNull: false })
  declare description: string;

  @ApiProperty({
    example: "https://example.com/book-text/1984-uz.txt",
    description: "Matn faylining URL manzili",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare text_url: string;

  @ApiProperty({
    example: "https://example.com/covers/1984-uz.jpg",
    description: "Kitob muqovasi uchun rasm URL",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare cover_url: string;

  @ApiProperty({ type: () => Book })
  @BelongsTo(() => Book)
  declare book: Book;

  @ApiProperty({ type: () => Language })
  @BelongsTo(() => Language)
  declare language: Language;

  @HasMany(() => AudioBook)
  audioBook: AudioBook[];
}
