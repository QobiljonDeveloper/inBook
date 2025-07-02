import { ApiProperty } from "@nestjs/swagger";
import {
  IsInt,
  IsPositive,
  IsString,
  IsNotEmpty,
  Min,
  IsNumber,
} from "class-validator";

export class CreateAudioBookDto {
  @ApiProperty({
    example: 2,
    description: "BookVersion ID (foreign key)",
  })
  @IsInt({ message: "bookVersionId butun son bo'lishi kerak" })
  @IsPositive({ message: "bookVersionId musbat bo'lishi kerak" })
  bookVersionId: number;

  @ApiProperty({
    example: "John Smith",
    description: "Audio kitobni o'qigan shaxsning ismi",
  })
  @IsString({ message: "narrator_name matn bo'lishi kerak" })
  @IsNotEmpty({ message: "narrator_name bo'sh bo'lmasligi kerak" })
  narrator_name: string;

  @ApiProperty({
    example: 7200,
    description: "Audio kitobning umumiy davomiyligi (soniyalarda)",
  })
  @IsInt({ message: "total_duration butun son bo'lishi kerak" })
  @Min(1, { message: "total_duration 1 dan katta bo'lishi kerak" })
  total_duration: number;

  @ApiProperty({
    example: 150,
    description: "Audio kitob hajmi megabaytlarda",
  })
  @IsNumber({}, { message: "total_size_mb son bo'lishi kerak" })
  @Min(0.1, { message: "total_size_mb 0 dan katta bo'lishi kerak" })
  total_size_mb: number;
}
