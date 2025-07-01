import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ICategoryCreationAttr {
  name: string;
}

@Table({ tableName: "categories", timestamps: false })
export class Category extends Model<Category, ICategoryCreationAttr> {
  @ApiProperty({ example: 1, description: "Unikal ID" })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({ example: "Technology", description: "Kategoriya nomi" })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare name: string;
}
