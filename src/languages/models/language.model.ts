import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ILanguageCreationAttr {
  code: string;
  name: string;
  flag: string;
}

@Table({ tableName: "languages", timestamps: false })
export class Language extends Model<Language, ILanguageCreationAttr> {
  @ApiProperty({ example: 1, description: "Unikal ID" })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({
    example: "uz",
    description: "Davlat tilining kod raqami",
  })
  @Column({
    type: DataType.STRING(30),
    allowNull: false,
    unique: true,
  })
  declare code: string;

  @ApiProperty({ example: "Uzbek", description: "Til nomi" })
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare name: string;

  @ApiProperty({
    example: "🇺🇿",
    description: "Tilga mos bayroq emoji yoki rasm URL",
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare flag: string;
}
