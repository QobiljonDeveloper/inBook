import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface AdminCreationAttrs {
  full_name: string;
  email: string;
  password: string;
  is_creator?: boolean;
  is_active?: boolean;
}

@Table({ tableName: "admins", createdAt: true, updatedAt: false })
export class Admin extends Model<Admin, AdminCreationAttrs> {
  @ApiProperty({ example: 1, description: "Unikal ID" })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ example: "Admin Name", description: "Admin to‘liq ismi" })
  @Column({ type: DataType.STRING, allowNull: false })
  declare full_name: string;

  @ApiProperty({ example: "admin@gmail.com", description: "Email manzili" })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  declare email: string;

  @ApiProperty({
    example: "HashedPassword123",
    description: "Parol (hashlangan)",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare password: string;

  @ApiProperty({ example: true, description: "Admin content yaratuvchimi" })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare is_creator: boolean;

  @ApiProperty({ example: true, description: "Admin aktivligi" })
  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  declare is_active: boolean;
}
