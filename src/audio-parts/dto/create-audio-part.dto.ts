import { ApiProperty } from "@nestjs/swagger";
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
} from "class-validator";

export class CreateAudioPartDto {
  @ApiProperty({ example: 2, description: "AudioBook ID" })
  @IsInt()
  @IsPositive()
  audioBookId: number;

  @ApiProperty({ example: "Part 1 - Introduction" })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: "https://example.com/part1.mp3" })
  file_url: string;

  @ApiProperty({ example: 300 })
  @IsInt()
  duration: number;

  @ApiProperty({ example: 5.2 })
  @IsNumber()
  size_mb: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  order_index: number;
}
