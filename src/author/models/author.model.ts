import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IAuthorCreationAttr {
  full_name: string;
  bio: string;
  photo_url: string;
}

@Table({ tableName: "authors", timestamps: false })
export class Author extends Model<Author, IAuthorCreationAttr> {
  @ApiProperty({ example: 1, description: "Unikal ID" })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({ example: "John Doe", description: "Muallifning to‘liq ismi" })
  @Column({ type: DataType.STRING, allowNull: false })
  declare full_name: string;

  @ApiProperty({
    example: "Yozuvchi, tarjimon...",
    description: "Muallif haqida ma’lumot",
  })
  @Column({ type: DataType.TEXT, allowNull: false })
  declare bio: string;

  @ApiProperty({
    example: "https://example.com/photo.jpg",
    description: "Muallif rasmi URL manzili",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare photo_url: string;
}
