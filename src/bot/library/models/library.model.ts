import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ILibraryCreationAttr {
  user_id: number;
  last_state: string;
}

@Table({ tableName: "library", timestamps: false })
export class Library extends Model<Library, ILibraryCreationAttr> {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.BIGINT,
  })
  declare user_id: number;
  @Column({
    type: DataType.STRING(100),
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
  })
  declare address: string;
  @Column({
    type: DataType.STRING,
  })
  declare location: string;

  @Column({
    type: DataType.STRING(50),
  })
  declare last_state: string;

  @Column({
    type: DataType.STRING(20),
  })
  declare phone_number: string;
}
