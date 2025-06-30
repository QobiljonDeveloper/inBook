import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IUserCreationAttr {
  full_name: string;
  email: string;
  password: string;
  gender: string;
  birth_year: number;
  phone: string;
}

@Table({ tableName: "users", createdAt: true, updatedAt: false })
export class User extends Model<User, IUserCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare full_name: string;

  @Column({
    type: DataType.STRING(30),
    allowNull: false,
  })
  declare phone: string;

  @Column({
    type: DataType.STRING(50),
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.TEXT,
  })
  declare password: string;

  @Column({
    type: DataType.ENUM("Erkak", "Ayol"),
  })
  declare gender: string;

  @Column({
    type: DataType.SMALLINT,
  })
  declare birth_year: number;

  @ApiProperty({
    example: "false",
    description: "Foydalanuvchi subscription sotib olganmi ",
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare is_premium: boolean;
  @ApiProperty({
    example: "false",
    description: "Foydalanuvchi aktivligi ",
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare is_active: boolean;

  @ApiProperty({
    example: "false",
    description: "Activation link ",
  })
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare activation_link: string;

  @ApiProperty({
    example: "refresh token",
    description: "Refresh Token ",
  })
  @Column({
    type: DataType.STRING(2000),
  })
  declare refresh_token: string | null;
}
