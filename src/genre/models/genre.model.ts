import { Table, Column, DataType, Model } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface GenreCreationAttrs {
  name: string;
}

@Table({ tableName: "genres", timestamps: false })
export class Genre extends Model<Genre, GenreCreationAttrs> {
  @ApiProperty({ example: 1, description: "Unikal ID" })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({ example: "Drama", description: "Janr nomi (unique)" })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  declare name: string;
}
