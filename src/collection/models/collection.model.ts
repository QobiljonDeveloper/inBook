import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/models/user.model";
import { BookCollection } from "../../book-collection/models/book-collection.model";

export interface ICollectionCreationAttr {
  title: string;
  description?: string;
  coverImageUrl?: string;
  createdBy: number;
  isPublic?: boolean;
  isPremiumOnly?: boolean;
  isPremium?: boolean;
}

@Table({ tableName: "collections", timestamps: true })
export class Collection extends Model<Collection, ICollectionCreationAttr> {
  @ApiProperty({ example: 1, description: "Unique identifier" })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({
    example: "Nature Collection",
    description: "Collection title",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @ApiProperty({
    example: "A collection of nature-related content",
    description: "Description of the collection",
  })
  @Column({ type: DataType.STRING })
  description: string;

  @ApiProperty({
    example: "https://example.com/image.jpg",
    description: "Cover image URL",
  })
  @Column({ type: DataType.STRING })
  coverImageUrl: string;

  @ApiProperty({
    example: 1,
    description: "ID of the user who created this collection",
  })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  createdBy: number;

  @ApiProperty({ example: false, description: "Is this collection public?" })
  @Column({ type: DataType.BOOLEAN })
  isPublic: boolean;

  @ApiProperty({
    example: false,
    description: "Is this collection only for premium users?",
  })
  @Column({ type: DataType.BOOLEAN })
  isPremiumOnly: boolean;

  @ApiProperty({ example: false, description: "Is this a premium collection?" })
  @Column({ type: DataType.BOOLEAN })
  isPremium: boolean;

  @BelongsTo(() => User, "createdBy")
  creator: User;

  @BelongsToMany(() => Collection, () => BookCollection)

  collections: Collection[];
}
