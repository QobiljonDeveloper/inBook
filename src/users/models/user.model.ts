import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Subscription } from "../../subscription/models/subscription.model";
import { BookMark } from "../../book-marks/models/book-mark.model";

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
  @ApiProperty({
    example: 1,
    description: "Unikal foydalanuvchi ID raqami",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: "Ali Valiyev",
    description: "Foydalanuvchining to‘liq ismi",
  })
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare full_name: string;

  @ApiProperty({
    example: "+998901234567",
    description: "Foydalanuvchining telefon raqami",
  })
  @Column({
    type: DataType.STRING(30),
    allowNull: false,
  })
  declare phone: string;

  @ApiProperty({
    example: "ali@gmail.com",
    description: "Foydalanuvchining email manzili (unique)",
  })
  @Column({
    type: DataType.STRING(50),
    unique: true,
  })
  declare email: string;

  @ApiProperty({
    example: "$2b$10$hashedpassword",
    description: "Hashed parol",
  })
  @Column({
    type: DataType.TEXT,
  })
  declare password: string;

  @ApiProperty({
    example: "Erkak",
    description: "Jinsi: Erkak yoki Ayol",
  })
  @Column({
    type: DataType.ENUM("Erkak", "Ayol"),
  })
  declare gender: string;

  @ApiProperty({
    example: 1998,
    description: "Tug‘ilgan yil",
  })
  @Column({
    type: DataType.SMALLINT,
  })
  declare birth_year: number;

  @ApiProperty({
    example: true,
    description: "Foydalanuvchi premium hisobga egami",
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare is_premium: boolean;

  @ApiProperty({
    example: true,
    description: "Foydalanuvchi akkaunti aktivlashtirilganmi",
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare is_active: boolean;

  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare activation_link: string;

  @Column({
    type: DataType.STRING(2000),
  })
  declare refresh_token: string | null;

  @HasMany(() => Subscription)
  subscription: Subscription[];

  @HasMany(() => BookMark)
  bookMark: BookMark[];
}
