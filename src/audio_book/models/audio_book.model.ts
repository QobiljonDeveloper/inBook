import { ApiProperty } from "@nestjs/swagger";
import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { BookVersion } from "src/book_version/models/book_version.model";
import { AudioPart } from "../../audio-parts/models/audio-part.model";

interface IAudioBookCreationAttr {
  bookVersionId: number;
  narrator_name: string;
  total_duration: number;
  total_size_mb: number;
}

@Table({ tableName: "audio_book", timestamps: false })
export class AudioBook extends Model<AudioBook, IAudioBookCreationAttr> {
  @ApiProperty({ example: 1, description: "AudioBook ID" })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ example: 2, description: "BookVersion ID (foreign key)" })
  @ForeignKey(() => BookVersion)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: "book_version_id",
  })
  declare bookVersionId: number;

  @ApiProperty({
    example: "John Smith",
    description: "Narrator's full name",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare narrator_name: string;

  @ApiProperty({
    example: 7200,
    description: "Total duration in seconds (e.g., 2 hours = 7200)",
  })
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare total_duration: number;

  @ApiProperty({
    example: 150,
    description: "Total size in megabytes (MB)",
  })
  @Column({ type: DataType.FLOAT, allowNull: false })
  declare total_size_mb: number;

  @ApiProperty({ type: () => BookVersion })
  @BelongsTo(() => BookVersion)
  bookVersion: BookVersion;

  @HasMany(() => AudioPart)
  audioPart: AudioPart[];
}
