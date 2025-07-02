import { ApiProperty } from "@nestjs/swagger";
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { AudioBook } from "src/audio_book/models/audio_book.model";

interface IAudioPartCreationAttr {
  audioBookId: number;
  title: string;
  file_url: string;
  duration: number;
  size_mb: number;
  order_index: number;
}

@Table({ tableName: "audio_parts", timestamps: true })
export class AudioPart extends Model<AudioPart, IAudioPartCreationAttr> {
  @ApiProperty({ example: 1, description: "Audio part ID" })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ example: 2, description: "AudioBook ID (foreign key)" })
  @ForeignKey(() => AudioBook)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare audioBookId: number;

  @ApiProperty({ type: () => AudioBook })
  @BelongsTo(() => AudioBook)
  declare audioBook: AudioBook;

  @ApiProperty({ example: "Part 1 - Introduction", description: "Part title" })
  @Column({ type: DataType.STRING, allowNull: false })
  declare title: string;

  @ApiProperty({
    example: "https://example.com/part1.mp3",
    description: "Audio file URL",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare file_url: string;

  @ApiProperty({ example: 300, description: "Duration in seconds" })
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare duration: number;

  @ApiProperty({ example: 5.2, description: "Size in MB" })
  @Column({ type: DataType.FLOAT, allowNull: false })
  declare size_mb: number;

  @ApiProperty({ example: 1, description: "Order index of the part" })
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare order_index: number;
}
